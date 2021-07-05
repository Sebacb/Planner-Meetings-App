using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using PlannerApp.Models;
using System;

namespace PlannerApp.Helpers
{
    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Method)]
    public class AuthorizeAttribute : Attribute, IAuthorizationFilter
    {
        public string Roles { get; set; }
        public void OnAuthorization(AuthorizationFilterContext context)
        {
            var user = (Employee)context.HttpContext.Items["User"];
            if (user == null)
            {
                var adUser = context.HttpContext.User.Identity;
                if (!adUser.IsAuthenticated || (!string.IsNullOrEmpty(Roles) && Roles.Contains(user.Role)))
                {
                    // not logged in
                    context.Result = new JsonResult(new { message = "Unauthorized" }) { StatusCode = StatusCodes.Status401Unauthorized };
                }
            }
        }
    }
}
