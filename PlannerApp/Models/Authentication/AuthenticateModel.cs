using System.ComponentModel.DataAnnotations;

namespace PlannerApp.Models.Authentication
{
    public class AuthenticateModel
    {
        [Required]
        public string Username { get; set; }

        [Required]
        public string Password { get; set; }

        public bool IsAdUser { get; set; }
    }
}
