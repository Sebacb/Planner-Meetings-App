using PlannerApp.Models;
using PlannerApp.Models.Dtos;
using System.Collections.Generic;

namespace PlannerApp.Mappers
{
    public static class LogsMapper
    {
        public static LogDto MapFrom(Log model)
        {
            return new LogDto
            {
                Date = model.TimeStamp.ToString(),
                LogLevel = model.Level,
                Message = model.Message
            };
        }

        public static List<LogDto> MapListFrom(List<Log> model)
        {
            var returnedList = new List<LogDto>();
            foreach (var log in model)
            {
                returnedList.Add(MapFrom(log));
            }
            return returnedList;
        }
    }
}
