using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using PlannerApp.Helpers;
using PlannerApp.Helpers.Chat;
using PlannerApp.Helpers.Chat.Clients;
using PlannerApp.Services.Abstractions;
using System.Threading.Tasks;

namespace PlannerApp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ChatController : ControllerBase
    {
        private readonly IHubContext<ChatHub, IChatClient> _chatHub;
        private IMessageService _messageService;

        public ChatController(IHubContext<ChatHub, IChatClient> chatHub, IMessageService messageService)
        {
            _chatHub = chatHub;
            _messageService = messageService;
        }

        [HttpGet("initialize")]
        public async Task Initialize(string client, string username)
        {
            var messages = _messageService.GetMessages(username);
            foreach (var message in messages)
            {
                await _chatHub.Clients.Client(client).ReceiveMessage(new ChatMessage() { User = message.Employee.Username, Message = message.Message, Id = message.Id });
            }
        }

        [HttpPost("messages")]
        public async Task Post(ChatMessage message)
        {
            // run some logic...
            message.Id = _messageService.SaveMessages(message.User, message.Message);
            await _chatHub.Clients.All.ReceiveMessage(message);
        }
    }
}
