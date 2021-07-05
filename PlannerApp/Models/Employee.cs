using PlannerApp.Models.Generic;
using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace PlannerApp.Models
{
    public class Employee : Entity
    {
        public string Name { get; set; }
        public string Surname { get; set; }
        public string PhoneNumber { get; set; }
        public string Email { get; set; }

        public string Department { get; set; }

        public string Username { get; set; }
        public string Password { get; set; }
        public string Role { get; set; }
        public string Token { get; set; }

        public int FailedAttempts { get; set; }
        public DateTime? RecconnectTime { get; set; }


        public int TeamId { get; set; }
        [JsonIgnore]
        public Team Team { get; set; }
        [JsonIgnore]
        public List<DatabaseChatMessage> Messages { get; set; }
    }
}
