using Microsoft.Extensions.Options;
using PlannerApp.Helpers;
using PlannerApp.Models;
using PlannerApp.Repository;
using PlannerApp.Services.Abstractions;
using System;
using System.Linq;

namespace PlannerApp.Services
{
    public class TeamService : ITeamService
    {
        private readonly IRepository<Team> _teamRepository;
        private readonly AdministrationSettings _administrationSettings;

        public TeamService(IRepository<Team> teamRepository,
                           IOptions<AdministrationSettings> administrationSettings)
        {
            _teamRepository = teamRepository;
            _administrationSettings = administrationSettings.Value;
        }

        public Team GetTeam(int teamId)
        {
            if (teamId == 0)
            {
                return new Team()
                {
                    CreatedAt = DateTime.Now,
                    Employees = new System.Collections.Generic.List<Employee>(),
                    Name = "Administration",
                    Id = 0
                };
            }
            var dbTeam = _teamRepository.GetById(teamId);
            if (dbTeam.Name.Equals(_administrationSettings.AdminUser))
            {
                var allTeams = _teamRepository.GetAll().Where(t => t.Id != dbTeam.Id).ToList();
                foreach (var team in allTeams)
                {
                    foreach (var employee in team.Employees)
                    {
                        dbTeam.Employees.Add(employee);
                    }
                }
            }
            return dbTeam;
        }
    }
}

