using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using PlannerApp.Helpers;
using PlannerApp.Models;
using PlannerApp.Models.Generic;
using PlannerApp.Repository;
using PlannerApp.Services.Abstractions;
using System;
using System.IdentityModel.Tokens.Jwt;
using Novell.Directory.Ldap;
using System.Security.Claims;
using System.Text;
using System.Collections.Generic;
using Microsoft.Extensions.Logging;
using PlannerApp.Models.Dtos;
using System.IO;
using System.IO.Compression;
using System.Xml;

namespace PlannerApp.Services
{
    public class UserService : IUserService
    {
        private readonly IRepository<Employee> _employeeRepository;
        private readonly IRepository<Team> _teamRepository;
        private readonly IMailService _mailService;
        private readonly AppSettings _appSettings;
        private readonly MailSettings _mailSettings;
        private readonly AdministrationSettings _administrationSettings;
        private readonly ILogger<UserService> _logger;

        public UserService(IRepository<Employee> employeeRepository,
                           IRepository<Team> teamRepository,
                           IMailService mailService,
                           IOptions<AppSettings> appSettings,
                           IOptions<MailSettings> mailSettings,
                           IOptions<AdministrationSettings> administrationSettings,
                           ILogger<UserService> logger)
        {
            _employeeRepository = employeeRepository;
            _teamRepository = teamRepository;
            _mailService = mailService;
            _appSettings = appSettings.Value;
            _mailSettings = mailSettings.Value;
            _administrationSettings = administrationSettings.Value;
            _logger = logger;
        }

        public Employee Authenticate(string username, string password)
        {
            var user = _employeeRepository.FindFirstBy(x => x.Username == username);
            if (username == _administrationSettings.AdminUser && password == _administrationSettings.AdminPassword)
            {
                user = new Employee()
                {
                    CreatedAt = DateTime.Now,
                    Email = $"{_administrationSettings.AdminUser}@{_appSettings.Domain}",
                    Id = 0,
                    Username = _administrationSettings.AdminUser,
                    Name = _administrationSettings.AdminUser,
                    Password = _administrationSettings.AdminPassword,
                    PhoneNumber = string.Empty,
                    Role = Role.Admin,
                    Surname = _administrationSettings.AdminUser,
                };
            }
            if (user.RecconnectTime.HasValue && user.RecconnectTime.Value > DateTime.Now)
            {
                _logger.LogError($"User-ul este blocat pentru conectare: {username}");
                throw new Exception($"Acest user este blocat pentru conectare pentru { user.RecconnectTime.Value.Minute - DateTime.Now.Minute} minute");
            }

            // return null if user not found
            if (user == null)
            {
                _logger.LogError($"User-ul este invalid: {username}");
                throw new Exception($"User-ul este invalid");
            }
            if (!user.Password.Equals(password))
            {
                user.FailedAttempts++;
                if (user.FailedAttempts == 3)
                {
                    user.RecconnectTime = DateTime.Now.AddMinutes(3);
                    user.FailedAttempts = 0;
                    _employeeRepository.Update(user);
                    _mailService.SendEmail(new MailRequest()
                    {
                        ToEmail = _mailSettings.Mail,
                        Body = $"S-a incercat logarea userului: {username} de peste 3 ori cu o parola incorecta",
                        Subject = "Security"
                    });
                    _logger.LogError($"S-a incercat logarea userului: {username} de peste 3 ori cu o parola incorecta");
                    throw new Exception($"Acest user este blocat pentru conectare pentru 3 minute");
                }
                _employeeRepository.Update(user);
                _logger.LogError($"S-a incercat logarea userului invalida: {username}");
                throw new Exception($"Parola este incorecta");
            }
            user.FailedAttempts = 0;
            user.RecconnectTime = null;
            if (username != _administrationSettings.AdminUser)
            {
                _employeeRepository.Update(user);
            }

            // authentication successful so generate jwt token
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_appSettings.Secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, user.Id.ToString()),
                    new Claim(ClaimTypes.Role, user.Role)
                }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            user.Token = tokenHandler.WriteToken(token);
            //_employeeRepository.Update(user);
            return user.WithoutPassword();
        }

        public Employee AuthenticateWithAd(string username, string password)
        {
            Employee employee = null;
            try
            {
                string searchBase = "CN=Users,DC=IT,DC=root";
                LdapSearchConstraints constraints = new LdapSearchConstraints();
                constraints.TimeLimit = 30000;
                var nameArray = username.Split('.');
                string searchFilter = string.Empty;
                if (nameArray.Length == 1 && nameArray[0].Equals(_administrationSettings.AdminUser))
                {
                    searchFilter = $"(CN={nameArray[0]})";
                }
                else
                {
                    searchFilter = $"(CN={nameArray[0]} {nameArray[1]})";
                }
                using (var conn = new LdapConnection { SecureSocketLayer = false })
                {
                    conn.Connect(_appSettings.AdServer, _appSettings.AdPort);
                    conn.Bind(LdapConnection.LdapV3, $"{username}@{_appSettings.Domain}", password);

                    var searchResults = conn.Search(
                        searchBase,
                        LdapConnection.ScopeSub,
                        searchFilter,
                        null, // no specified attributes
                        false, // return attr and value
                        constraints);
                    string teamName = string.Empty;
                    while (searchResults.HasMore())
                    {
                        //count++;
                        var nextEntry = searchResults.Next();

                        nextEntry.GetAttributeSet();
                        employee = new Employee()
                        {
                            CreatedAt = DateTime.Now,
                            Email = nextEntry.GetAttribute("mail").StringValue,
                            Name = nextEntry.GetAttribute("givenName").StringValue,
                            Password = password,
                            Role = nextEntry.GetAttribute("title").StringValue,
                            Surname = nextEntry.GetAttribute("sn").StringValue,
                            Username = username,
                            PhoneNumber = nextEntry.GetAttribute("telephoneNumber").StringValue,
                            Department = nextEntry.GetAttribute("department").StringValue,
                        };
                        teamName = nextEntry.GetAttribute("physicalDeliveryOfficeName").StringValue;
                        break;
                    }
                    var existingEmployee = _employeeRepository.FindFirstBy(e => e.Email.Equals(employee.Email));
                    var existingTeam = _teamRepository.FindFirstBy(t => t.Name.Equals(teamName));

                    if (existingEmployee != null)
                    {
                        employee.Id = existingEmployee.Id;
                        _employeeRepository.Update(employee);
                        if (existingTeam != null)
                        {
                            employee.TeamId = existingTeam.Id;
                        }
                    }
                    else
                    {
                        if (existingTeam != null)
                        {
                            employee.Team = existingTeam;
                            employee.TeamId = existingTeam.Id;
                            _employeeRepository.Insert(employee);
                            existingTeam.Employees.Add(employee);
                            _teamRepository.Update(existingTeam);
                        }
                        else
                        {
                            var dbTeam = new Team()
                            {
                                CreatedAt = DateTime.Now,
                                Employees = new List<Employee>(),
                                Name = teamName
                            };
                            _teamRepository.Insert(dbTeam);
                            employee.Team = dbTeam;
                            employee.TeamId = dbTeam.Id;
                            _employeeRepository.Update(employee);
                            dbTeam.Employees.Add(employee);
                            _teamRepository.Update(dbTeam);
                        }
                    }

                    // authentication successful so generate jwt token
                    var tokenHandler = new JwtSecurityTokenHandler();
                    var key = Encoding.ASCII.GetBytes(_appSettings.Secret);
                    var tokenDescriptor = new SecurityTokenDescriptor
                    {
                        Subject = new ClaimsIdentity(new Claim[]
                        {
                    new Claim(ClaimTypes.Name, employee.Id.ToString()),
                    new Claim(ClaimTypes.Role, employee.Role)
                        }),
                        Expires = DateTime.UtcNow.AddDays(7),
                        SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
                    };
                    var token = tokenHandler.CreateToken(tokenDescriptor);
                    employee.Token = tokenHandler.WriteToken(token);
                    //_employeeRepository.Update(user);
                    return employee.WithoutPassword();
                }
            }
            catch (LdapException ldapEx)
            {
                throw (new Exception(ldapEx.Message));
                // ocassional time outs
            }
            catch (Exception ex)
            {
                ex.ToString();
                throw (new Exception("A aparut o eroare. Contacteaza administratorul pentru mai multe detalii."));
            }
            return null;
        }

        public Employee AuthenticateWithCreation(string username, string password)
        {
            var user = new Employee { Username = username, Password = password, Role = Role.JuniorDeveloper };
            _employeeRepository.Insert(user);

            // authentication successful so generate jwt token
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_appSettings.Secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, user.Id.ToString()),
                    new Claim(ClaimTypes.Role, user.Role)
                }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            user.Token = tokenHandler.WriteToken(token);
            //_employeeRepository.Update(user);
            return user.WithoutPassword();
        }

        public Employee GetById(int userId)
        {
            return _employeeRepository.GetById(userId);
        }

        public Employee ProvideUserFromADFS(string samlResponse)
        {
            Employee employee = null;
            try
            {
                var DecodedSamlResponse = Convert.FromBase64String(samlResponse);
                var memStream = new MemoryStream(DecodedSamlResponse);
                var deflate = new DeflateStream(memStream, CompressionMode.Decompress);
                string decodedString = new StreamReader(deflate, Encoding.UTF8).ReadToEnd();
                XmlDocument doc = new XmlDocument();
                doc.LoadXml(decodedString);
                var xmlProps = doc.GetElementsByTagName("Attribute");
                string teamName = string.Empty;
                employee = new Employee() { CreatedAt = DateTime.Now };
                for (int idx = 0; idx < xmlProps.Count; idx++)
                {
                    if (xmlProps[idx].OuterXml.Contains("department"))
                    {
                        employee.Department = xmlProps[idx].InnerText;
                        continue;
                    }
                    if (xmlProps[idx].OuterXml.Contains("email"))
                    {
                        employee.Email = xmlProps[idx].InnerText;
                        continue;
                    }
                    if (xmlProps[idx].OuterXml.Contains("userName"))
                    {
                        employee.Name = xmlProps[idx].InnerText;
                        continue;
                    }
                    if (xmlProps[idx].OuterXml.Contains("userSurname"))
                    {
                        employee.Surname = xmlProps[idx].InnerText;
                        continue;
                    }
                    if (xmlProps[idx].OuterXml.Contains("userRole"))
                    {
                        employee.Role = xmlProps[idx].InnerText;
                        continue;
                    }
                    if (xmlProps[idx].OuterXml.Contains("telephoneNumber"))
                    {
                        employee.PhoneNumber = xmlProps[idx].InnerText;
                        continue;
                    }
                    if (xmlProps[idx].OuterXml.Contains("Team"))
                    {
                        teamName = xmlProps[idx].InnerText;
                        continue;
                    }
                    if (xmlProps[idx].OuterXml.Contains("logonName"))
                    {
                        employee.Username = xmlProps[idx].InnerText.Substring(0, xmlProps[idx].InnerText.IndexOf('@'));
                        continue;
                    }
                }
                var existingEmployee = _employeeRepository.FindFirstBy(e => e.Email.Equals(employee.Email));
                var existingTeam = _teamRepository.FindFirstBy(t => t.Name.Equals(teamName));

                if (existingEmployee != null)
                {
                    employee.Id = existingEmployee.Id;
                    if (existingTeam != null)
                    {
                        employee.TeamId = existingTeam.Id;
                        employee.Team = existingTeam;
                    }
                    _employeeRepository.Update(employee);
                }
                else
                {
                    if (existingTeam != null)
                    {
                        employee.Team = existingTeam;
                        employee.TeamId = existingTeam.Id;
                        _employeeRepository.Insert(employee);
                        existingTeam.Employees.Add(employee);
                        _teamRepository.Update(existingTeam);
                    }
                    else
                    {
                        var dbTeam = new Team()
                        {
                            CreatedAt = DateTime.Now,
                            Employees = new List<Employee>(),
                            Name = teamName
                        };
                        _teamRepository.Insert(dbTeam);
                        employee.Team = dbTeam;
                        employee.TeamId = dbTeam.Id;
                        _employeeRepository.Update(employee);
                        dbTeam.Employees.Add(employee);
                        _teamRepository.Update(dbTeam);
                    }
                }

                // authentication successful so generate jwt token
                var tokenHandler = new JwtSecurityTokenHandler();
                var key = Encoding.ASCII.GetBytes(_appSettings.Secret);
                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Subject = new ClaimsIdentity(new Claim[]
                    {
                    new Claim(ClaimTypes.Name, employee.Id.ToString()),
                    new Claim(ClaimTypes.Role, employee.Role)
                    }),
                    Expires = DateTime.UtcNow.AddDays(7),
                    SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
                };
                var token = tokenHandler.CreateToken(tokenDescriptor);
                employee.Token = tokenHandler.WriteToken(token);
                //_employeeRepository.Update(user);
                return employee.WithoutPassword();
            }
            catch (Exception ex)
            {
                _logger.LogError($"Nu s-a putut face logarea cu ADFS:{ex.Message}");
            }
            return employee;
        }

        public bool ResetPassword(string username)
        {
            var dbUser = _employeeRepository.FindFirstBy(u => u.Username.Equals(username));
            if (dbUser == null)
            {
                return false;
            }
            else
            {
                _mailService.SendEmail(new MailRequest()
                {
                    ToEmail = _mailSettings.Mail,
                    Body = $"S-a cerut o resetare a parolei pentru {dbUser.Name} {dbUser.Surname}:{dbUser.Username}.",
                    Subject = "Password reset"
                });
            }
            return true;
        }

        private string ProcessRole(string value)
        {
            return value.Substring(0, value.IndexOf(","));
        }
    }
}

