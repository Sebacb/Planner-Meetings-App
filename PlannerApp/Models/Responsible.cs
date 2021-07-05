using PlannerApp.Models.Enums;
using PlannerApp.Models.Generic;

namespace PlannerApp.Models
{
    public class Responsible : Entity
    {
        public int EmployeeId { get; set; }
        public int ResponsibleEmployeeId { get; set; }

        public EmployeeRelationshipEnum Relationship { get; set; }
    }
}
