using Microsoft.AspNetCore.SignalR;
using PlannerApp.Helpers.Chat.Clients;
using System.Threading.Tasks;

namespace PlannerApp.Helpers.Chat
{
    public class ChatHub : Hub<IChatClient>
    {
    }
}
