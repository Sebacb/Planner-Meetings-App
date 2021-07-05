using System.Collections.Generic;

namespace PlannerApp.Models.Dtos
{
    public class DashboardDto
    {
        public List<ResponsiblesDto> Responsibles { get; set; }
        public List<DashboardMeetingDto> Meetings { get; set; }
    }
}
