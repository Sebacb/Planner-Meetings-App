using PlannerApp.Models;
using PlannerApp.Repository;
using PlannerApp.Services.Abstractions;
using System;
using System.Collections.Generic;
using System.Linq;

namespace PlannerApp.Services
{
    public class NotificationService : INotificationService
    {
        private readonly IRepository<Notification> _notificationRepository;
        private readonly IRepository<Meeting> _meetingRepository;

        public NotificationService(IRepository<Notification> notificationRepository, IRepository<Meeting> meetingRepository)
        {
            _notificationRepository = notificationRepository;
            _meetingRepository = meetingRepository;
        }

        public void AddNotificaion(int userId, string message, DateTime date, int? meetingId)
        {
            Meeting dbMeeting = null;
            if (meetingId.HasValue)
            {
                dbMeeting = _meetingRepository.GetById(meetingId.Value);
            }

            var obj = new Notification
            {
                CreatedAt = DateTime.Now,
                IsHidden = false,
                Meeting = dbMeeting,
                NotificationDate = date,
                NotificationMessage = message,
                UserId = userId
            };
            _notificationRepository.Insert(obj);
        }

        public bool DismissAllNotificaions(int userId)
        {
            var dbNotifications = _notificationRepository.GetAllBy(n => n.UserId == userId);
            foreach (var notification in dbNotifications)
            {
                notification.IsHidden = true;
                _notificationRepository.Update(notification);
            }
            return true;
        }

        public List<Notification> DismissNotificaion(int notificationId)
        {
            var dbNotification = _notificationRepository.GetById(notificationId);
            var userId = dbNotification.UserId;
            dbNotification.IsHidden = true;
            _notificationRepository.Update(dbNotification);
            return GetNotifications(userId);
        }

        public List<Notification> GetNotifications(int userId)
        {
            return _notificationRepository.GetAllBy(n => n.UserId == userId && !n.IsHidden).OrderByDescending(n => n.CreatedAt).ToList();
        }
    }
}
