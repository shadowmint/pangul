using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Pangul.Core.Data;
using Pangul.Services.Actions;
using Pangul.Services.Db.Questions;

namespace Pangul.Services.Concrete.Db.Questions
{
  public class QuestionPurgeCommandHandler : ICommandHandler<PurgeQuestionData>, ICommandHandler<PurgeAnswerData>
  {
    public async Task Execute(PangulDbContext db, PurgeQuestionData command)
    {
      command.Validate();      
      db.RequireActiveTransaction();

      // Remove answers
      foreach (var answer in db.Answer.Where(i => i.QuestionId == command.Question.QuestionId))
      {
        await Execute(db, new PurgeAnswerData()
        {
          Answer = answer,
          UserContext = command.UserContext
        });
      }

      // Remove meta objects
      var meta = await db.QuestionMeta.Where(i => i.QuestionId == command.Question.QuestionId).ToListAsync();
      db.QuestionMeta.RemoveRange(meta);

      // Remove global meta
      var global = await db.QuestionGlobalMeta.Where(i => i.QuestionGlobalMetaId == command.Question.QuestionGlobalMetaId).FirstOrDefaultAsync();
      db.QuestionGlobalMeta.Remove(global);

      // Remove answer
      db.Question.Remove(command.Question);
    }

    public async Task Execute(PangulDbContext db, PurgeAnswerData command)
    {
      command.Validate();
      db.RequireActiveTransaction();

      // Remove meta objects
      var meta = await db.AnswerMeta.Where(i => i.AnswerId == command.Answer.AnswerId).ToListAsync();
      db.AnswerMeta.RemoveRange(meta);

      // Remove global meta
      var global = await db.AnswerGlobalMeta.Where(i => i.AnswerGlobalMetaId == command.Answer.AnswerGlobalMetaId).FirstOrDefaultAsync();
      db.AnswerGlobalMeta.Remove(global);

      // Remove answer
      db.Answer.Remove(command.Answer);
    }
  }
}