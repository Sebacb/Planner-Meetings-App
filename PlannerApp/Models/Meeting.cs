using PlannerApp.Models.Generic;
using System;
using System.Collections.Generic;

namespace PlannerApp.Models
{
    public class Meeting : Entity
    {
        public Employee Owner { get; set; }
        public string Subject { get; set; }
        public string Description { get; set; }
        public DateTime Start { get; set; }
        public DateTime End { get; set; }
        public List<MeetingAttendee> Attendees { get; set; }
    }
}
