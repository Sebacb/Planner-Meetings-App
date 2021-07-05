namespace PlannerApp.Models.Dtos
{
    public class MeetingAttendeeDto
    {
        public int EmployeeId { get; set; }
        public string EmployeeName { get; set; }
        public bool? HasConfirmed { get; set; }
    }
}
