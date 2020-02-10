namespace Pangul.Services.Infrastructure.Backup
{
  public interface IBackupSerializer
  {
    byte[] SerializeObjectForBackup<T>(T target) where T : class;
    string Extension { get; }
  }
}