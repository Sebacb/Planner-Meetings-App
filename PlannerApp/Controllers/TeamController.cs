using Microsoft.AspNetCore.Mvc;
using PlannerApp.Helpers;
using PlannerApp.Services.Abstractions;

namespace PlannerApp.Controllers
{

    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class TeamController : ControllerBase
    {
        private readonly ITeamService _teamService;
        public TeamController(ITeamService teamService)
        {
            _teamService = teamService;
        }

        [HttpGet("getTeamInfo")]
        public IActionResult GetTeamInfo(int teamId)
        {
            var response  = _teamService.GetTeam(teamId);
            return Ok(response);
        }
    }
}
