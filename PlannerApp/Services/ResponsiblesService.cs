using PlannerApp.Mappers;
using PlannerApp.Models;
using PlannerApp.Models.Dtos;
using PlannerApp.Models.Generic;
using PlannerApp.Repository;
using PlannerApp.Services.Abstractions;
using System.Collections.Generic;
using System.Linq;

namespace PlannerApp.Services
{
    public class ResponsiblesService : IResponsiblesService
    {
        private IRepository<Responsible> _responsibleRepository;
        private IRepository<Employee> _employeeRepository;
        private IRepository<Team> _teamRepository;

        public ResponsiblesService(IRepository<Responsible> reposnsibleRepository, IRepository<Employee> employeeRepository, IRepository<Team> teamRepository)
        {
            _responsibleRepository = reposnsibleRepository;
            _employeeRepository = employeeRepository;
            _teamRepository = teamRepository;
        }

        public List<int> GetResponsibleIdsFor(int userId)
        {
            var responsibles = _responsibleRepository.GetAllBy(r => r.EmployeeId == userId);
            return responsibles.Select(r => r.Id).ToList();
        }

        public List<ResponsiblesDto> GetResponsiblesFor(int userId)
        {
            var dbLoggedEmployee = _employeeRepository.GetById(userId);
            var responsibles = _responsibleRepository.GetAllBy(r => r.EmployeeId == userId).ToList();
            var mappedList = new List<ResponsiblesDto>();
            if (userId == 0 || dbLoggedEmployee.Role.Equals(Role.Admin))
            {
                var allEmployees = _employeeRepository.GetAll().ToList();
                ResponsibleMapper.MapListFrom(allEmployees);
            }
            else
            {
                mappedList = ResponsibleMapper.MapListFrom(responsibles.ToList());
                foreach (var element in mappedList)
                {
                    var dbEmployee = _employeeRepository.FindFirstBy(e => e.Id == element.EmployeeId);
                    element.EmployeeName = $"{dbEmployee.Name} {dbEmployee.Surname}";
                }
            }
            return mappedList;
        }
    }
}