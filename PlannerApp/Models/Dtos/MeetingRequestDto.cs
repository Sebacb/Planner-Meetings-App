using System;

namespace PlannerApp.Models.Dtos
{
    public class MeetingRequestDto
    {
        public int UserId { get; set; }
        public DateTime End { get; set; }
        public DateTime Start { get; set; }
        public bool IsAllDay { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public int RoomId { get; set; }
        public int PersonIDs { get; set; }
    }
}
