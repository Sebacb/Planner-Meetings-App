using PlannerApp.Mappers;
using PlannerApp.Models;
using PlannerApp.Models.Dtos;
using PlannerApp.Repository;
using PlannerApp.Services.Abstractions;
using System.Collections.Generic;
using System.Linq;

namespace PlannerApp.Services
{
    public class LogService : ILogService
    {
        private IRepository<Log> _logRepository;
        public LogService(IRepository<Log> logRepository)
        {
            _logRepository = logRepository;
        }

        public List<LogDto> GetAllLogs()
        {
            var logs = _logRepository.GetAll().OrderByDescending(l => l.TimeStamp).ToList();
            return LogsMapper.MapListFrom(logs);
        }
    }
}
