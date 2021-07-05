using PlannerApp.Models;
using PlannerApp.Models.Dtos;
using System.Collections.Generic;

namespace PlannerApp.Mappers
{
    public static class MeetingsMapper
    {
        public static DashboardMeetingDto MapToDashboardDtoFrom(Meeting meeting)
        {
            return new DashboardMeetingDto()
            {
                End = meeting.End,
                Start = meeting.Start,
                MeetingDescription = meeting.Description,
                MeetingId = meeting.Id,
                MeetingSubject = meeting.Subject,
                OwnerId = meeting.Owner.Id,
                OwnerName = $"{meeting.Owner.Name} {meeting.Owner.Surname}"
            };
        }

        public static List<DashboardMeetingDto> MapToDashboardListDtoFrom(List<Meeting> meetings)
        {
            var returnedList = new List<DashboardMeetingDto>();
            foreach (var meeting in meetings)
            {
                returnedList.Add(MapToDashboardDtoFrom(meeting));
            }
            return returnedList;
        }

        public static OtherMeetingDto MapToOtherFrom(Meeting meeting, int userId)
        {
            return new OtherMeetingDto
            {
                Attendees = AttendeesMapper.MapToDtoListFrom(meeting.Attendees),
                Description = meeting.Description,
                End = meeting.End.AddHours(3),
                MeetingId = meeting.Id,
                Start = meeting.Start.AddHours(3),
                Subject = meeting.Subject,
                ResponsibleId = userId
            };
        }

        public static MeetingDto MapToDtoFrom(Meeting meeting)
        {
            return new MeetingDto
            {
                Attendees = AttendeesMapper.MapToDtoListFrom(meeting.Attendees),
                Description = meeting.Description,
                End = meeting.End.AddHours(3),
                MeetingId = meeting.Id,
                Start = meeting.Start.AddHours(3),
                Subject = meeting.Subject
            };
        }

        public static List<MeetingDto> MapToDtoFromList(List<Meeting> meetings)
        {
            var list = new List<MeetingDto>();
            foreach (var meeting in meetings)
            {
                list.Add(MapToDtoFrom(meeting));
            }

            return list;
        }
    }
}
