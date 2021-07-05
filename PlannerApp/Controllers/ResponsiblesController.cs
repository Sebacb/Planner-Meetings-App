using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PlannerApp.Services.Abstractions;

namespace PlannerApp.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class ResponsiblesController : ControllerBase
    {
        private IResponsiblesService _responsiblesService;
        public ResponsiblesController(IResponsiblesService responsiblesService)
        {
            _responsiblesService = responsiblesService;
        }

        [HttpGet("getResponsibles")]
        public IActionResult GetResponsibles(int userId)
        {
            var responsibles = _responsiblesService.GetResponsiblesFor(userId);

            return Ok(responsibles);
        }
    }
}
