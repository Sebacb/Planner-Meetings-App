using System.Collections.Generic;

namespace PlannerApp.Models.Dtos
{
    public class RequestsDto
    {
        public List<RequestDto> Requests { get; set; }

        public RequestsDto()
        {
            Requests = new List<RequestDto>();
        }
    }
}
