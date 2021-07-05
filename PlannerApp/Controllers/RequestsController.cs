using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PlannerApp.Models.Dtos;
using PlannerApp.Models.Generic;
using PlannerApp.Services.Abstractions;

namespace PlannerApp.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class RequestsController : ControllerBase
    {
        private readonly IRequestsService _requestsService;

        public RequestsController(IRequestsService requestsService)
        {
            _requestsService = requestsService;
        }

        [Authorize(Roles = Role.AllRoles)]
        [HttpPost("insert/{userId}")]
        public IActionResult Insert(string userId, [FromBody] RequestDto model)
        {
            return Ok(_requestsService.InserNewRequest(model, int.Parse(userId)));
        }

        [Authorize(Roles = Role.AllRoles)]
        [HttpGet("getRequests")]
        public IActionResult GetRequests(int userId)
        {
            return Ok(_requestsService.GetAllRequestsFor(userId));
        }

        [Authorize(Roles = Role.AllRoles)]
        [HttpPost("delete")]
        public IActionResult Delete(int requestId, int userId)
        {
            return Ok(_requestsService.DeleteRequest(requestId, userId));
        }
    }
}
