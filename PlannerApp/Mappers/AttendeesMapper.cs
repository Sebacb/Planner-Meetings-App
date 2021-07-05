using PlannerApp.Models;
using PlannerApp.Models.Dtos;
using System.Collections.Generic;

namespace PlannerApp.Mappers
{
    public static class AttendeesMapper
    {
        public static MeetingAttendeeDto MapDtoFrom(MeetingAttendee meetingAttendee)
        {
            return new MeetingAttendeeDto
            {
                EmployeeId = meetingAttendee.Employee.Id,
                EmployeeName = $"{meetingAttendee.Employee.Name} {meetingAttendee.Employee.Surname}",
                HasConfirmed = meetingAttendee.Confirmed
            };
        }

        public static List<MeetingAttendeeDto> MapToDtoListFrom(List<MeetingAttendee> meetingAttendees)
        {
            var list = new List<MeetingAttendeeDto>();

            foreach (var attendee in meetingAttendees)
            {
                if (attendee.Id != 0 || attendee.Employee != null)
                {
                    list.Add(MapDtoFrom(attendee));
                }
            }
            return list;
        }
    }
}
