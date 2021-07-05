using PlannerApp.Mappers;
using PlannerApp.Models;
using PlannerApp.Models.Dtos;
using PlannerApp.Repository;
using PlannerApp.Services.Abstractions;
using System;
using System.Collections.Generic;
using System.Linq;

namespace PlannerApp.Services
{
    public class MeetingService : IMeetingService
    {
        private readonly IRepository<Meeting> _meetingRepository;
        private readonly IRepository<Employee> _employeeRepository;
        private readonly IRepository<Notification> _notificationRepository;
        private readonly IRepository<MeetingAttendee> _meetingAttendeeRepository;
        private readonly IRepository<Team> _teamRepository;
        private readonly IResponsiblesService _responsiblesService;
        private readonly INotificationService _notificationService;
        private readonly IMailService _mailService;

        public MeetingService(IRepository<Meeting> meetingRepository,
                              IRepository<MeetingAttendee> meetingAttendeeRepository,
                              IRepository<Employee> employeeRepository,
                              IRepository<Notification> notificationRepository,
                              IRepository<Team> teamRepository,
                              IResponsiblesService responsiblesService,
                              INotificationService notificationService,
                              IMailService mailService)
        {
            _meetingRepository = meetingRepository;
            _meetingAttendeeRepository = meetingAttendeeRepository;
            _responsiblesService = responsiblesService;
            _mailService = mailService;
            _teamRepository = teamRepository;
            _employeeRepository = employeeRepository;
            _notificationService = notificationService;
            _notificationRepository = notificationRepository;
        }

        public void ChangeMeetingStatus(ChangeMeetingDto dto)
        {
            var meetingAttendee = _meetingAttendeeRepository.FindFirstBy(m => m.Meeting.Id == dto.MeetingId && m.EmployeeId == dto.UserId);
            meetingAttendee.Confirmed = dto.Confirm;
            _meetingAttendeeRepository.Update(meetingAttendee);
        }

        public bool CreateMeeting(MeetingRequestDto dto)
        {
            try
            {
                var owner = _employeeRepository.GetById(dto.UserId);
                var attendee = _employeeRepository.GetById(dto.PersonIDs);
                var meeting = new Meeting
                {
                    CreatedAt = DateTime.Now,
                    Description = dto.Description,
                    End = dto.End,
                    Start = dto.Start,
                    Owner = owner,
                    Subject = dto.Title,
                };

                _meetingRepository.Insert(meeting);
                var dbMeetAttendee = new MeetingAttendee()
                {
                    CreatedAt = DateTime.Now,
                    Employee = attendee,
                    Meeting = meeting
                };
                _meetingAttendeeRepository.Insert(dbMeetAttendee);

                meeting.Attendees = new List<MeetingAttendee>()
                {
                    dbMeetAttendee
                };
                _meetingRepository.Update(meeting);
                _notificationService.AddNotificaion(owner.Id, "You have created a meeting!", dto.Start, meeting.Id);
                _notificationService.AddNotificaion(attendee.Id, $"{owner.Name} {owner.Surname} has created a meeting with you!", dto.Start, meeting.Id);

                _mailService.SendEmail(new MailRequest()
                {
                    ToEmail = meeting.Owner.Email,
                    Body = $"Ai creat un meeting nou la data de: {meeting.Start.ToLocalTime()} cu : {attendee.Name} {attendee.Surname}",
                    Subject = "Meeting nou"
                });
                _mailService.SendEmail(new MailRequest()
                {
                    ToEmail = attendee.Email,
                    Body = $"Un meeting nou s-a creat in data de: {meeting.Start.ToLocalTime()} de catre: {meeting.Owner.Name} {meeting.Owner.Surname}",
                    Subject = "Meeting nou"
                });
                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
        }

        public bool CreateMeetingForTeam(MeetingRequestDto dto)
        {
            try
            {
                var owner = _employeeRepository.GetById(dto.UserId);
                var meeting = new Meeting
                {
                    CreatedAt = DateTime.Now,
                    Description = dto.Description,
                    End = dto.End,
                    Start = dto.Start,
                    Owner = owner,
                    Subject = dto.Title,
                    Attendees = new List<MeetingAttendee>()
                };

                _meetingRepository.Insert(meeting);

                var team = _teamRepository.GetById(owner.TeamId);
                foreach (var member in team.Employees)
                {
                    if (member.Id != owner.Id)
                    {
                        var dbMeetAttendee = new MeetingAttendee()
                        {
                            CreatedAt = DateTime.Now,
                            Employee = member,
                            Meeting = meeting
                        };
                        _meetingAttendeeRepository.Insert(dbMeetAttendee);
                        meeting.Attendees.Add(dbMeetAttendee);
                        _notificationService.AddNotificaion(member.Id, $"{owner.Name} {owner.Surname} has created a meeting with you!", dto.Start, meeting.Id);


                        _mailService.SendEmail(new MailRequest()
                        {
                            ToEmail = member.Email,
                            Body = $"Un meeting nou s-a creat in data de: {meeting.Start.ToLocalTime()} de catre: {meeting.Owner.Name} {meeting.Owner.Surname}",
                            Subject = "Meeting nou"
                        });
                    }
                }
                _mailService.SendEmail(new MailRequest()
                {
                    ToEmail = meeting.Owner.Email,
                    Body = $"Ai creat un meeting nou la data de: {meeting.Start.ToLocalTime()} cu toata echipa.",
                    Subject = "Meeting Nou"
                });
                _meetingRepository.Update(meeting);
                _notificationService.AddNotificaion(owner.Id, "You have created a meeting!", dto.Start, meeting.Id);

                return true;
            }
            catch
            {
                return false;
            }
        }

        public void DeleteMeeting(int meetingId)
        {
            var dbMeeting = _meetingRepository.GetById(meetingId);
            var attendeesIds = dbMeeting.Attendees.Select(ma => ma.Id).ToList();
            var notifications = _notificationRepository.GetAllBy(n => n.Meeting != null && n.Meeting.Id == dbMeeting.Id);
            foreach (var attendee in attendeesIds)
            {
                _notificationService.AddNotificaion(attendee, $"{dbMeeting.Owner.Name} {dbMeeting.Owner.Surname} has canceled a meeting with you!", dbMeeting.Start, null);
                _meetingAttendeeRepository.Delete(attendee);
            }
            foreach (var notification in notifications)
            {
                _notificationRepository.Delete(notification.Id);
            }
            _notificationService.AddNotificaion(dbMeeting.Owner.Id, $"You have canceled a meeting on {dbMeeting.Start.ToShortDateString()}!", DateTime.Now, null);

            _meetingRepository.Delete(dbMeeting.Id);

        }

        public MeetingsDto GetMeetingInfo(int userId)
        {
            var dto = new MeetingsDto();
            var startInterval = DateTime.Now.AddDays(-(int)DateTime.Now.DayOfWeek);
            startInterval = startInterval.AddHours(-startInterval.Hour);
            var endInterval = DateTime.Now.AddDays(6 - (int)DateTime.Now.DayOfWeek);
            endInterval = endInterval.AddHours(24 - endInterval.Hour);
            var dbEmployee = _employeeRepository.GetById(userId);
            var dbAttendee = _meetingAttendeeRepository.GetById(-1);
            var dbWeekMeetings = _meetingRepository.GetAllBy(m => m.Owner.Id == userId && m.Start.Date > startInterval.Date && m.Start.Date < endInterval.Date).ToList();
            foreach (var meeting in dbWeekMeetings)
            {
                foreach (var attendee in meeting.Attendees)
                {
                    attendee.Employee = _employeeRepository.GetById(attendee.EmployeeId);
                }
            }
            dto.WeekMeetings = MeetingsMapper.MapToDtoFromList(dbWeekMeetings);

            var responsibles = _responsiblesService.GetResponsibleIdsFor(userId);
            var otherMeets = _meetingAttendeeRepository.GetAllBy(ma => ma.Meeting.Start.Date > startInterval.Date && ma.Meeting.Start.Date < endInterval.Date && ma.EmployeeId == userId);

            foreach (var meet in otherMeets)
            {
                dto.OtherMeetings.Add(MeetingsMapper.MapToOtherFrom(meet.Meeting, meet.Employee.Id));
            }

            return dto;
        }

        public List<DashboardMeetingDto> GetTodaysMeetingsFor(int userId)
        {
            var dbMeets = _meetingRepository.GetAllBy(m => m.Start.Date == DateTime.Now.Date && m.Owner.Id == userId).OrderBy(m => m.Start).ToList();
            return MeetingsMapper.MapToDashboardListDtoFrom(dbMeets);
        }
    }
}
