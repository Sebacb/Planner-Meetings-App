using PlannerApp.Models.Dtos;
using System.Collections.Generic;

namespace PlannerApp.Services.Abstractions
{
    public interface ILogService
    {
        public List<LogDto> GetAllLogs();
    }
}
