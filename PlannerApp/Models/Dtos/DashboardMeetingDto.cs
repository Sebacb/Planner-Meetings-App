using System;

namespace PlannerApp.Models.Dtos
{
    public class DashboardMeetingDto
    {
        public int OwnerId { get; set; }
        public string OwnerName { get; set; }
        public int MeetingId { get; set; }
        public string MeetingSubject { get; set; }
        public string MeetingDescription { get; set; }
        public DateTime Start { get; set; }
        public DateTime End { get; set; }
    }
}
