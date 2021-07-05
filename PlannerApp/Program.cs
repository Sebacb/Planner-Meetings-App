using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Hosting;
using Serilog;
using Serilog.Sinks.MSSqlServer;
using System.IO;
using System.Reflection;

namespace PlannerApp
{
    public class Program
    {
        public static void Main(string[] args)
        {
            Directory.CreateDirectory($"{Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location)}/logs");
            Log.Logger = new LoggerConfiguration()
                .MinimumLevel.Warning()
                .Enrich.FromLogContext()
                .WriteTo.File($"{Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location)}/logs/log.txt", rollingInterval: RollingInterval.Day)
                .WriteTo.MSSqlServer(
                        connectionString: "Server=10.13.104.2;Database=PlannerApp4;Trusted_Connection=False;User=databaseAdmin;Password=Seba4321;MultipleActiveResultSets=true",
                        sinkOptions: new MSSqlServerSinkOptions { TableName = "Logs"})
                .CreateLogger();
            CreateHostBuilder(args).Build().Run();
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .UseSerilog()
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>()
                    .UseUrls("http://localhost:4010");
                });
    }
}
