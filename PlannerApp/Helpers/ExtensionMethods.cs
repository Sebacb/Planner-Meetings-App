using PlannerApp.Models;
using System.Collections.Generic;
using System.Linq;

namespace PlannerApp.Helpers
{
    public static class ExtensionMethods
    {
        public static IEnumerable<Employee> WithoutPasswords(this IEnumerable<Employee> users)
        {
            if (users == null) return null;

            return users.Select(x => x.WithoutPassword());
        }

        public static Employee WithoutPassword(this Employee user)
        {
            if (user == null) return null;

            user.Password = null;
            return user;
        }
    }
}
