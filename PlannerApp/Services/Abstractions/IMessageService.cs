using PlannerApp.Models;
using System.Collections.Generic;

namespace PlannerApp.Services.Abstractions
{
    public interface IMessageService
    {
        public List<DatabaseChatMessage> GetMessages(string username);
        public int SaveMessages(string username, string message);
    }
}
