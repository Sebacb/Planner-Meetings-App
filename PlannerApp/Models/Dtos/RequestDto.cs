namespace PlannerApp.Models.Dtos
{
    public class RequestDto
    {
        public int RequestId { get; set; }
        public string Subject { get; set; }
        public string Description { get; set; }
        public int Layer { get; set; }
        public bool IsFixed { get; set; }
    }
}
