using PlannerApp.Models.Generic;
using System.Text.Json.Serialization;

namespace PlannerApp.Models
{
    public class DatabaseChatMessage : Entity
    {
        public int EmployeeId { get; set; }
        public Employee Employee { get; set; }

        public int TeamId { get; set; }

        public string Message { get; set; }
    }
}
