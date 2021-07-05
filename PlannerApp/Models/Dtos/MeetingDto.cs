using System;
using System.Collections.Generic;

namespace PlannerApp.Models.Dtos
{
    public class MeetingDto
    {
        public int MeetingId { get; set; }
        public string Subject { get; set; }
        public string Description { get; set; }
        public DateTime Start { get; set; }
        public DateTime End { get; set; }
        public List<MeetingAttendeeDto> Attendees { get; set; }

        public MeetingDto()
        {
            Attendees = new List<MeetingAttendeeDto>();
        }
    }
}
