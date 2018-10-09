using Microsoft.EntityFrameworkCore;
using Pangul.Backend.Web.Configuration.Settings;
using Pangul.Backend.Web.Errors;
using Pangul.Core.Data;

namespace Pangul.Backend.Web.Configuration.Core
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
  }
}