using Microsoft.Data.Sqlite;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Logging.Console;
using Microsoft.Extensions.Options;
using Pangul.Core.Data;

namespace Pangul.Services.Tests.Fixtures
{
    public class TestDbContext : PangulDbContext
    {
        private static SqliteConnection _connection;
        private ILoggerFactory _loggerFactory;

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
           RequireConnection();
           ConfigureDebugLogging(optionsBuilder);
           optionsBuilder.UseSqlite(_connection);
        }

        private void ConfigureDebugLogging(DbContextOptionsBuilder optionsBuilder)
        {
            if (_loggerFactory == null)
            {
                var serviceProvider = new ServiceCollection().AddLogging(options =>
                {
                    options.AddFilter(DbLoggerCategory.Database.Command.Name, LogLevel.Debug);
                    options.AddConsole();
                    options.AddDebug();
                    options.SetMinimumLevel(LogLevel.Debug);
                }).BuildServiceProvider();
                _loggerFactory = serviceProvider.GetService<ILoggerFactory>();
            }

            optionsBuilder.UseLoggerFactory(_loggerFactory);
        }

        private static void RequireConnection()
        {
            if (_connection != null) return;
            _connection = new SqliteConnection("DataSource=:memory:");
            _connection.Open();

            // Create schema if required!
            using (var context = new TestDbContext())
            {
                context.Database.EnsureCreated();
            }
        }

        /// <summary>
        /// Drop the shared global test instance.
        /// </summary>
        public static void Drop()
        {
            if (_connection == null) return;
            _connection.Close();
            _connection = null;
        }

        public override PangulDbContext CreateScope()
        {
            return new TestDbContext();
        }
    }
}