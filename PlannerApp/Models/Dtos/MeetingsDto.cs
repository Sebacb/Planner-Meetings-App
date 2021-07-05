using System.Collections.Generic;

namespace PlannerApp.Models.Dtos
{
    public class MeetingsDto
    {
        public List<MeetingDto> WeekMeetings { get; set; }
        public List<OtherMeetingDto> OtherMeetings { get; set; }
        
        public MeetingsDto()
        {
            WeekMeetings = new List<MeetingDto>();
            OtherMeetings = new List<OtherMeetingDto>();
        }
    }
}
