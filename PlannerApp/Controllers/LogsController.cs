using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PlannerApp.Models.Generic;
using PlannerApp.Services.Abstractions;

namespace PlannerApp.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class LogsController : ControllerBase
    {
        private ILogService _logService;

        public LogsController(ILogService logService)
        {
            _logService = logService;
        }

        [Authorize(Roles = Role.Admin)]
        [HttpGet("getLogs")]
        public IActionResult GetLogs()
        {
            return Ok(_logService.GetAllLogs());
        }
    }
}
