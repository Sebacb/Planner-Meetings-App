using System;
using System.ComponentModel.DataAnnotations;

namespace PlannerApp.Models.Generic
{
    public class Entity : IEntity
    {
        [Key]
        public int Id { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
