using PlannerApp.Models.Generic;

namespace PlannerApp.Models
{
    public class RequestMessage: Entity
    {
        public Request Request { get; set; }
        public string Message { get; set; }
    }
}
