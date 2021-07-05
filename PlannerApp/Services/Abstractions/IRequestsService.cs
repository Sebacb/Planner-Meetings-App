using PlannerApp.Models;
using PlannerApp.Models.Dtos;

namespace PlannerApp.Services.Abstractions
{
    public interface IRequestsService
    {
        public RequestsDto InserNewRequest(RequestDto request, int userId);
        public RequestsDto DeleteRequest(int requestId, int userId);
        public RequestsDto GetAllRequests();
        public RequestsDto GetAllRequestsFor(int userId);
    }
}
