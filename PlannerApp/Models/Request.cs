using PlannerApp.Models.Generic;
using System.Collections.Generic;

namespace PlannerApp.Models
{
    public class Request : Entity
    {
        public Employee Employee { get; set; }
        public Employee Assigne { get; set; }
        public List<RequestMessage> Messages { get; set; }
        public bool IsComplete { get; set; }
    }
}
