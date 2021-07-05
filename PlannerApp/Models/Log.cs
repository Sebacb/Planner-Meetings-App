using PlannerApp.Models.Generic;
using System;

namespace PlannerApp.Models
{
    public class Log : Entity
    {
        public string Message { get; set; }
        public string MessageTemplate { get; set; }
        public string Level { get; set; }
        public DateTime TimeStamp { get; set; }
        public string Exception { get; set; }
        public string Properties { get; set; }
    }
}
