using PlannerApp.Models.Generic;

namespace PlannerApp.Models
{
    public class MeetingAttendee : Entity
    {
        public int EmployeeId { get; set; }
        public Employee Employee { get; set; }
        public Meeting Meeting { get; set; }
        public bool? Confirmed { get; set; }
    }
}
