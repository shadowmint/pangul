namespace Pangul.Services.Infrastructure.Backup
{
  public class DataBackupConfiguration
  {
    public string BackupOutputFolder { get; set; }
    public IBackupSerializer Serializer { get; set; }
  }
}