using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens.Saml2;
using Novell.Directory.Ldap;
using PlannerApp.Models;
using PlannerApp.Models.Authentication;
using PlannerApp.Models.Dtos;
using PlannerApp.Models.Generic;
using PlannerApp.Services.Abstractions;
using System;
using System.IO;
using System.IO.Compression;
using System.Net;
using System.Text;
using System.Web;
using System.Xml;

namespace PlannerApp.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        private IUserService _userService;
        private IResponsiblesService _responsiblesService;
        private IMeetingService _meetingService;
        private INotificationService _notificationService;

        public UsersController(IUserService userService,
                               IResponsiblesService responsiblesService,
                               IMeetingService meetingService,
                               INotificationService notificationService)
        {
            _userService = userService;
            _responsiblesService = responsiblesService;
            _meetingService = meetingService;
            _notificationService = notificationService;
        }

        [AllowAnonymous]
        [HttpPost("authenticate")]
        public IActionResult Authenticate([FromBody] AuthenticateModel model)
        {
            try
            {
                Employee user = null;

                if (model.IsAdUser)
                {
                    //pass the connectionString here
                    user = _userService.AuthenticateWithAd(model.Username, model.Password);
                }
                else
                {
                    user = _userService.Authenticate(model.Username, model.Password);
                }
                if (user == null)
                    return BadRequest(new { message = "Username or password is incorrect" });
                return Ok(user);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }

        [AllowAnonymous]
        [HttpGet("logout")]
        public IActionResult Logout()
        {
            return Ok();
        }

        [Authorize(Roles = Role.AllRoles)]
        [HttpGet("getLayerInfo")]
        public IActionResult GetLayerInfo(int userId)
        {
            return Ok(_responsiblesService.GetResponsiblesFor(userId));
        }

        [PlannerApp.Helpers.Authorize]
        //[Authorize(AuthenticationSchemes = NegotiateDefaults.AuthenticationScheme)]
        //[Authorize(Roles = Role.AllRoles)]
        [HttpGet("getUserDashboardInfo")]
        public IActionResult GetUserDashboardInfo(int userId)
        {
            var dto = new DashboardDto();
            dto.Responsibles = _responsiblesService.GetResponsiblesFor(userId);
            dto.Meetings = _meetingService.GetTodaysMeetingsFor(userId);
            return Ok(dto);
        }

        [PlannerApp.Helpers.Authorize]
        [HttpGet("getNotificatications")]
        public IActionResult GetNotifications(int userId)
        {
            return Ok(_notificationService.GetNotifications(userId));
        }

        [PlannerApp.Helpers.Authorize]
        [HttpPost("deleteNotification")]
        public IActionResult DeleteNotification([FromBody] DismissNotificationDto dto)
        {
            return Ok(_notificationService.DismissNotificaion(dto.NotificationId));
        }

        [PlannerApp.Helpers.Authorize]
        [HttpPost("deleteAllNotifications")]
        public IActionResult deleteAllNotifications([FromBody] DeleteAllNotificationsDto dto)
        {
            return Ok(_notificationService.DismissAllNotificaions(dto.UserId));
        }

        [AllowAnonymous]
        [HttpPost("forgotPassword")]
        public IActionResult ForgotPassword([FromBody] ForgotPasswordDto dto)
        {
            return Ok(_userService.ResetPassword(dto.Username));
        }

        [AllowAnonymous]
        [HttpGet("authSaml")]
        public IActionResult AuthSaml([FromQuery] string SAMLResponse, [FromQuery] string signature, [FromQuery] string sigAlg)
        {
            return Ok(_userService.ProvideUserFromADFS(SAMLResponse));
        }

        [AllowAnonymous]
        [HttpPost("authSaml")]
        public IActionResult AuthSaml()
        {

            return Ok();
        }

        private static byte[] Decompress(byte[] data)
        {
            using (var compressedStream = new MemoryStream(data))
            using (var zipStream = new GZipStream(compressedStream, CompressionMode.Decompress))
            using (var resultStream = new MemoryStream())
            {
                zipStream.CopyTo(resultStream);
                return resultStream.ToArray();
            }
        }

    }
}
