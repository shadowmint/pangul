using Newtonsoft.Json;
using Pangul.Core.Infrastructure;

namespace Pangul.Services.Infrastructure.Backup
{
  public class JsonBackupSerializer : IBackupSerializer
  {
    public string Extension => "json";

    byte[] IBackupSerializer.SerializeObjectForBackup<T>(T target)
    {
      var json = JsonConvert.SerializeObject(target);
      return PangulStringEncoding.GetBytes(json);
    }
  }
}