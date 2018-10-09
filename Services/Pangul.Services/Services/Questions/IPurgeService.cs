using System.Threading.Tasks;
using Pangul.Core.Data;
using Pangul.Services.Infrastructure.Backup;
using Pangul.Services.Model;

namespace Pangul.Services.Services.Questions
{
  public interface IPurgeService
  {
    /// <summary>
    /// Purge a question and all the related data.
    /// </summary>
    Task PurgeExistingQuestion(PangulDbContext db, UserContext context, string questionId, DataBackupConfiguration backupConfiguration);
    
    /// <summary>
    /// Purge an answer and all the related data.
    /// </summary>
    Task PurgeExistingAnswer(PangulDbContext db, UserContext context, string answerId, DataBackupConfiguration backupConfiguration);
  }
}