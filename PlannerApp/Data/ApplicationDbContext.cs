using Microsoft.EntityFrameworkCore;
using PlannerApp.Models;

namespace PlannerApp.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }

        public DbSet<Employee> Employees { get; set; }
        public DbSet<Responsible> Responsibles { get; set; }
        public DbSet<Meeting> Meetings { get; set; }
        public DbSet<MeetingAttendee> Attendees { get; set; }
        public DbSet<Request> Requests { get; set; }
        public DbSet<RequestMessage> RequestMessages { get; set; }
        public DbSet<Notification> Notifications { get; set; }
        public DbSet<Team> Teams { get; set; }
        public DbSet<DatabaseChatMessage> Messages { get; set; }
        public DbSet<Log> Logs { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Log>().Ignore(p => p.CreatedAt);
            //modelBuilder.Entity<MeetingAttendee>().HasOne(e => e.Employee).WithMany()
        }
    }
}