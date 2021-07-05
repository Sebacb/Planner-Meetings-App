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
    public class MeetingController : ControllerBase
    {
        private IMeetingService _meetingService;


        public MeetingController(IMeetingService meetingService)
        {
            _meetingService = meetingService;
        }

        [HttpGet("getMeetingInfo")]
        public IActionResult GetMeetingInfo(int userId)
        {
            var meetingDto = _meetingService.GetMeetingInfo(userId);

            return Ok(meetingDto);
        }

        [HttpPost("createMeeting")]
        public IActionResult CreateMeeting([FromBody] MeetingRequestDto dto)
        {
            if (dto.PersonIDs == 0)
            {
                _meetingService.CreateMeetingForTeam(dto);
            }
            else
            {
                _meetingService.CreateMeeting(dto);
            }
            return Ok(_meetingService.GetMeetingInfo(dto.UserId));
        }

        [HttpPost("deleteMeeting")]
        public IActionResult DeleteMeeting([FromBody] DeleteMeetingDto dto)
        {
            _meetingService.DeleteMeeting(dto.MeetingId);
            return Ok(_meetingService.GetMeetingInfo(dto.UserId));
        }

        [HttpPost("changeMeetingStatus")]
        public IActionResult ChangeMeetingStatus([FromBody] ChangeMeetingDto dto)
        {
            _meetingService.ChangeMeetingStatus(dto);
            return Ok(_meetingService.GetMeetingInfo(dto.UserId));
        }
    }
}
