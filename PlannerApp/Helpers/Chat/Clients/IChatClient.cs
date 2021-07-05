using System.Threading.Tasks;

namespace PlannerApp.Helpers.Chat.Clients
{
    public interface IChatClient
    {
        Task ReceiveMessage(ChatMessage message);
    }
}
