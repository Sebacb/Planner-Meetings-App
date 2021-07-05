using PlannerApp.Models;
using PlannerApp.Models.Dtos;
using PlannerApp.Models.Enums;
using System.Collections.Generic;

namespace PlannerApp.Mappers
{
    public static class ResponsibleMapper
    {
        public static ResponsiblesDto MapFrom(Responsible model)
        {
            return new ResponsiblesDto
            {
                EmployeeId = model.ResponsibleEmployeeId,
                Relationship = model.Relationship.ToString()
            };
        }

        public static ResponsiblesDto MapFrom(Employee model)
        {
            return new ResponsiblesDto
            {
                EmployeeId = model.Id,
                Relationship = "Admin"
            };
        }


        public static List<ResponsiblesDto> MapListFrom(List<Responsible> modelList)
        {
            var returnedList = new List<ResponsiblesDto>();
            foreach (var model in modelList)
            {
                returnedList.Add(MapFrom(model));
            }
            return returnedList;
        }

        public static List<ResponsiblesDto> MapListFrom(List<Employee> employees)
        {
            var returnedList = new List<ResponsiblesDto>();
            foreach (var model in employees)
            {
                returnedList.Add(MapFrom(model));
            }
            return returnedList;
        }
    }
}
