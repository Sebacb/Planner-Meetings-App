using PlannerApp.Models.Dtos;
using System.Collections.Generic;

namespace PlannerApp.Services.Abstractions
{
    public interface IResponsiblesService
    {
        public List<int> GetResponsibleIdsFor(int userId);
        public List<ResponsiblesDto> GetResponsiblesFor(int userId);
    }
}
