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
  public class AnswerMetaCommandHandler :
    ICreateCommandHandler<CreateNewAnswerMeta, AnswerMeta>,
    ICommandHandler<UpdateAnswerMeta>,
    ICommandHandler<UpdateAnswerGlobalMeta>
  {
    public async Task<AnswerMeta> Execute(PangulDbContext db, CreateNewAnswerMeta command)
    {
      command.Validate();

      if (command.SkipIfExisting)
      {
        var instance = await db.AnswerMeta.FirstOrDefaultAsync(i =>
          i.UserId == command.UserContext.User.UserId && i.AnswerId == command.Derived.AnswerId);
        if (instance != null)
        {
          return instance;
        }
      }

      using (var innerDb = db.CreateScope())
      {
        var newInstance = new AnswerMeta()
        {
          UserId = command.UserContext.User.UserId,
          AnswerId = command.Derived.AnswerId,
          Votes = 0
        };

        innerDb.AnswerMeta.Add(newInstance);
        await innerDb.SaveChangesAsync();
      }

      return await db.AnswerMeta.FirstOrDefaultAsync(i => i.UserId == command.UserContext.User.UserId && i.AnswerId == command.Derived.AnswerId);
    }

    public async Task Execute(PangulDbContext db, UpdateAnswerMeta command)
    {
      command.Validate();

      var meta = await db.AnswerMeta.FirstOrDefaultAsync(i =>
        i.UserId == command.UserContext.User.UserId &&
        i.AnswerId == command.Derived.AnswerId &&
        i.RowVersion == command.Derived.RowVersion);

      // Maybe just inserted?
      if (meta == null)
      {
        meta = db.AnswerMeta.Local.AsQueryable().FirstOrDefault(i =>
          i.UserId == command.UserContext.User.UserId && i.AnswerId == command.Derived.AnswerId);
      }

      if (meta == null)
      {
        throw new PangulCommandFailedException(CommandFailureType.MissingData, $"No such AnswerMeta ({command.AnswerId})");
      }

      // Update properties
      meta.RowVersion = command.Derived.RowVersion;
      meta.Votes = command.Votes;
    }

    public async Task Execute(PangulDbContext db, UpdateAnswerGlobalMeta command)
    {
      command.Validate();

      // This should be an atomic increment
      var meta = await (from globalMeta in db.AnswerGlobalMeta
        join answer in db.Answer on globalMeta.AnswerGlobalMetaId equals answer.AnswerGlobalMetaId
        where answer.AnswerId == command.Derived.AnswerId
        select globalMeta).FirstAsync();

      meta.Votes += command.Votes;
    }
  }
}