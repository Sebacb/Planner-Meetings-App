using PlannerApp.Models.Generic;
using System.Collections.Generic;

namespace PlannerApp.Models
{
    public class Team : Entity
    {
        public string Name { get; set; }
        public List<Employee> Employees { get; set; }
    }
}
