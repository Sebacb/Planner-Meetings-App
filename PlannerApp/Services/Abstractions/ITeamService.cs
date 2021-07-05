using PlannerApp.Models;

namespace PlannerApp.Services.Abstractions
{
    public interface ITeamService
    {
        Team GetTeam(int teamId);
    }
}
