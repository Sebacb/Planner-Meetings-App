using PlannerApp.Models.Dtos;
using System.Collections.Generic;

namespace PlannerApp.Services.Abstractions
{
    public interface IMeetingService
    {
        List<DashboardMeetingDto> GetTodaysMeetingsFor(int userId);
        MeetingsDto GetMeetingInfo(int userId);
        bool CreateMeeting(MeetingRequestDto dto);
        void DeleteMeeting(int meetingId);
        bool CreateMeetingForTeam(MeetingRequestDto dto);
        void ChangeMeetingStatus(ChangeMeetingDto dto);
    }
}
