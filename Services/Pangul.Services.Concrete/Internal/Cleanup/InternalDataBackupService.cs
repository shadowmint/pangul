using System.IO.Abstractions;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Pangul.Core.Data;
using Pangul.Core.Data.Questions;
using Pangul.Services.Infrastructure.Backup;
using Pangul.Services.Internal.Cleanup;

namespace Pangul.Services.Concrete.Internal.Cleanup
{
  public class InternalDataBackupService : IInternalDataBackupService, IService
  {
    private readonly IFileSystem _fileSystem;

    public InternalDataBackupService(IFileSystem fileSystem)
    {
      _fileSystem = fileSystem;
    }

    public async Task Backup(PangulDbContext db, Question question, DataBackupConfiguration backupConfiguration)
    {
      RequireBackupFolder(backupConfiguration);
      var snapshot = await QuestionSnapshot(db, question);
      PersistBackupObject(snapshot, $"question{question.QuestionId}.{backupConfiguration.Serializer.Extension}", backupConfiguration);
    }

    public void Backup(Answer answer, DataBackupConfiguration backupConfiguration)
    {
      RequireBackupFolder(backupConfiguration);
      var snapshot = AnswerSnapshot(answer);
      PersistBackupObject(snapshot, $"answer{answer.AnswerId}.{backupConfiguration.Serializer.Extension}", backupConfiguration);
    }
    
    private static async Task<object> QuestionSnapshot(PangulDbContext db, Question question)
    {
      var snapshot = new
      {
        question.UserId,
        question.QuestionId,
        question.Title,
        question.Body,
        Tags = string.Join(", ", question.Tags.ToList()),
        Answers = (await db.Answer.Where(i => i.QuestionId == question.QuestionId).ToListAsync()).Select(AnswerSnapshot).ToArray()
      };
      return snapshot;
    }

    private static object AnswerSnapshot(Answer answer)
    {
      return new
      {
        answer.QuestionId,
        answer.AnswerId,
        answer.Body
      };
    }

    private void RequireBackupFolder(DataBackupConfiguration backupConfiguration)
    {
      if (!_fileSystem.Directory.Exists(backupConfiguration.BackupOutputFolder))
      {
        _fileSystem.Directory.CreateDirectory(backupConfiguration.BackupOutputFolder);
      }
    }

    private void PersistBackupObject<T>(T target, string filename, DataBackupConfiguration backupConfiguration) where T : class
    {
      var serializedObject = backupConfiguration.Serializer.SerializeObjectForBackup(target);
      var fullPath = _fileSystem.Path.Combine(backupConfiguration.BackupOutputFolder, filename);
      _fileSystem.File.WriteAllBytes(fullPath, serializedObject);
    }
  }
}