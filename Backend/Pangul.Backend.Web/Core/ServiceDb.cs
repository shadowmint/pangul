using System.IO;
using Microsoft.EntityFrameworkCore;
using NLog;
using Pangul.Backend.Web.Configuration.Settings;
using Pangul.Backend.Web.Infrastructure.Errors;
using Pangul.Core.Data;

namespace Pangul.Backend.Web.Core
{
  public class ServiceDb : PangulDbContext
  {
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
      var settings = new ServiceSettings();
      if (settings.Db.UseSqlite)
      {
        optionsBuilder.UseSqlite(settings.Db.Connection);
        return;
      }

      throw new WebRuntimeException(WebRuntimeErrorType.InvalidConfiguration,
        $"Invalid connection string for database: {settings.Db.Database}: {settings.Db.Connection}");
    }

    public override PangulDbContext CreateScope()
    {
      return new ServiceDb();
    }

    public static void CreateAndMigrateDatabaseIfMissing()
    {
      var settings = new ServiceSettings();
      if (!settings.Db.UseSqlite) return;
      
      var logger = LogManager.GetCurrentClassLogger();
      var dbPath = settings.Db.Connection.Substring("DataSource=".Length);
      if (!File.Exists(dbPath))
      {
        logger.Info("Missing database! Create and migrating a new database");
        using (var db = new ServiceDb())
        {
          db.Database.Migrate();
        }
      }
    }
  }
}