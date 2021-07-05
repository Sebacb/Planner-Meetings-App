using PlannerApp.Models;
using System;
using System.Collections.Generic;

namespace PlannerApp.Services.Abstractions
{
    public interface INotificationService
    {
        public List<Notification> GetNotifications(int userId);
        public void AddNotificaion(int userId, string message, DateTime date, int? meetingId);
        public List<Notification> DismissNotificaion(int notificationId);
        public bool DismissAllNotificaions(int userId);
    }
}
