using PlannerApp.Models.Dtos;

namespace PlannerApp.Services.Abstractions
{
    public interface IMailService
    {
        void SendEmail(MailRequest mailRequest);
    }
}
