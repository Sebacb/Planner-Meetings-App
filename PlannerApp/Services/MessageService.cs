using Microsoft.Extensions.Options;
using PlannerApp.Helpers;
using PlannerApp.Models;
using PlannerApp.Repository;
using PlannerApp.Services.Abstractions;
using System;
using System.Collections.Generic;
using System.Linq;

namespace PlannerApp.Services
{
    public class MessageService : IMessageService
    {
        private IRepository<DatabaseChatMessage> _chatMessageRepository;
        private IRepository<Employee> _employeeRepository;
        private AdministrationSettings _administrationSettings;

        public MessageService(IRepository<DatabaseChatMessage> chatMessageRepository, IRepository<Employee> employeeRepository, IOptions<AdministrationSettings> administrationSettings)
        {
            _chatMessageRepository = chatMessageRepository;
            _administrationSettings = administrationSettings.Value;
            _employeeRepository = employeeRepository;
        }
        public List<DatabaseChatMessage> GetMessages(string username)
        {
            if (username.Equals(_administrationSettings.AdminUser))
            {
                return _chatMessageRepository.GetAll().OrderBy(m => m.CreatedAt).ToList();
            }
            var dbUser = _employeeRepository.FindFirstBy(e => e.Username == username);
            return _chatMessageRepository.GetAllBy(cm => cm.TeamId == dbUser.TeamId).OrderBy(m => m.CreatedAt).ToList();
        }

        public int SaveMessages(string username, string message)
        {
            var dbUser = _employeeRepository.FindFirstBy(e => e.Username == username);
            var dbMessage = new DatabaseChatMessage()
            {
                CreatedAt = DateTime.Now,
                Employee = dbUser,
                EmployeeId = dbUser.Id,
                Message = message,
                TeamId = dbUser.TeamId
            };
            _chatMessageRepository.Insert(dbMessage);
            return dbMessage.Id;
        }
    }
}
