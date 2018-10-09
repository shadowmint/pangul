using System.Threading.Tasks;
using Pangul.Core.Data;
using Pangul.Core.Data.Questions;
using Pangul.Services.Infrastructure.Backup;

namespace Pangul.Services.Internal.Cleanup
{
  public interface IInternalDataBackupService
  {
    Task Backup(PangulDbContext db, Question question, DataBackupConfiguration backupConfiguration);
    void Backup(Answer answer, DataBackupConfiguration backupConfiguration);
  }
}