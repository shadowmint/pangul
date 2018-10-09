using Pangul.Backend.Web.Configuration.Settings;
using Pangul.Services.Infrastructure.Backup;

namespace Pangul.Backend.Web.Infrastructure
{
  public class BackupConfig : DataBackupConfiguration
  {
    public BackupConfig()
    {
      var settings = new ServiceSettings();
      BackupOutputFolder = settings.Db.PurgeBackupFolder;
      Serializer = new JsonBackupSerializer();
    }
  }
}