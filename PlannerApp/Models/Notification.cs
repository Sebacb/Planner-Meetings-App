using PlannerApp.Models.Generic;
using System;

namespace PlannerApp.Models
{
    public class Notification : Entity
    {
        public int UserId { get; set; }
        public string NotificationMessage { get; set; }
        public bool IsHidden { get; set; }
        public DateTime NotificationDate { get; set; }

        public Meeting Meeting { get; set; }
    }
}
