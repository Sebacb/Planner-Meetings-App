using Microsoft.AspNetCore.Mvc;
using PlannerApp.Models;

namespace PlannerApp.Services.Abstractions
{
    public interface IUserService
    {
        Employee Authenticate(string username, string password);
        Employee AuthenticateWithCreation(string username, string password);
        Employee AuthenticateWithAd(string username, string password);
        Employee GetById(int userId);
        bool ResetPassword(string username);
        Employee ProvideUserFromADFS(string samlResponse);
    }
}
