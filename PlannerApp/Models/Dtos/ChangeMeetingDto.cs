namespace PlannerApp.Models.Dtos
{
    public class ChangeMeetingDto
    {
        public int UserId { get; set; }
        public int MeetingId { get; set; }
        public bool Confirm { get; set; }
    }
}
