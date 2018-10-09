using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Pangul.Core.Data;
using Pangul.Core.Data.Questions;
using Pangul.Services.Actions;
using Pangul.Services.Db.Questions;
using Pangul.Services.Infrastructure.Errors;

namespace Pangul.Services.Concrete.Db.Questions
{
  public class QuestionMetaCommandHandler :
    ICreateCommandHandler<CreateNewQuestionMeta, QuestionMeta>,
    ICommandHandler<UpdateQuestionMeta>,
    ICommandHandler<UpdateQuestionGlobalMeta>
  {
    public async Task<QuestionMeta> Execute(PangulDbContext db, CreateNewQuestionMeta command)
    {
      command.Validate();

      if (command.SkipIfExisting)
      {
        var instance = await db.QuestionMeta.FirstOrDefaultAsync(i =>
          i.UserId == command.UserContext.User.UserId && i.QuestionId == command.Derived.QuestionId);
        if (instance != null)
        {
          return instance;
        }
      }

      using (var innerDb = db.CreateScope())
      {
        var newInstance = new QuestionMeta()
        {
          UserId = command.UserContext.User.UserId,
          QuestionId = command.Derived.QuestionId,
          Star = false,
          Votes = 0
        };

        innerDb.QuestionMeta.Add(newInstance);
        await innerDb.SaveChangesAsync();
      }

      return await db.QuestionMeta.FirstOrDefaultAsync(i =>
        i.UserId == command.UserContext.User.UserId && i.QuestionId == command.Derived.QuestionId);
    }

    public async Task Execute(PangulDbContext db, UpdateQuestionMeta command)
    {
      command.Validate();

      var meta = await db.QuestionMeta.FirstOrDefaultAsync(i =>
        i.UserId == command.UserContext.User.UserId &&
        i.QuestionId == command.Derived.QuestionId &&
        i.RowVersion == command.Derived.RowVersion);

      // Maybe just inserted?
      if (meta == null)
      {
        meta = db.QuestionMeta.Local.AsQueryable().FirstOrDefault(i =>
          i.UserId == command.UserContext.User.UserId && i.QuestionId == command.Derived.QuestionId);
      }

      if (meta == null)
      {
        throw new PangulCommandFailedException(CommandFailureType.MissingData, $"No such QuestionMeta ({command.QuestionId})");
      }

      // Update properties
      meta.RowVersion = command.Derived.RowVersion;
      meta.Votes = command.Votes;
      meta.Star = command.Star;
    }

    public async Task Execute(PangulDbContext db, UpdateQuestionGlobalMeta command)
    {
      command.Validate();

      // This should be an atomic increment
      var meta = await (from globalMeta in db.QuestionGlobalMeta
        join question in db.Question on globalMeta.QuestionGlobalMetaId equals question.QuestionGlobalMetaId
        where question.QuestionId == command.Derived.QuestionId
        select globalMeta).FirstAsync();

      meta.Votes += command.Votes;
    }
  }
}