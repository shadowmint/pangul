using System;
using Microsoft.Extensions.Configuration;

namespace Pangul.Backend.Web.Configuration.Settings
{
  public class ServiceDbSettings
  {
    public ServiceDbSettings(IConfiguration configuration)
    {
      Connection = configuration["Db:ConnectionString"];
      Database = configuration["Db:Database"];
      PurgeBackupFolder = configuration["Db:PurgeBackupFolder"];
    }

    public string Connection { get; }

    public string Database { get; }

    /// <summary>
    /// When purging data, push the purged records into this backup folder.
    /// </summary>
    public string PurgeBackupFolder { get; }
    
    public bool UseSqlite => Database != null && Database.ToLowerInvariant() == "sqlite";
  }
}