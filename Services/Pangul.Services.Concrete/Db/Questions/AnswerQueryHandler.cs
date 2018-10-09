using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Pangul.Core.Data;
using Pangul.Core.Data.Questions;
using Pangul.Services.Actions;
using Pangul.Services.Db.Questions;
using Pangul.Services.Internal.User;

namespace Pangul.Services.Concrete.Db.Questions
{
  public class AnswerQueryHandler :
    IQueryHandler<GetAnswerIds, IEnumerable<long>>,
    IQueryHandler<GetAnswer, Answer>,
    IQueryHandler<GetAnswerMeta, AnswerMeta>,
    IQueryHandler<GetAnswerGlobalMeta, AnswerGlobalMeta>
  {
    private readonly IInternalUserPermissionService _internalUserPermissionService;

    public AnswerQueryHandler(IInternalUserPermissionService internalUserPermissionService)
    {
      _internalUserPermissionService = internalUserPermissionService;
    }

    public async Task<IEnumerable<long>> Execute(PangulDbContext db, GetAnswerIds query)
    {
      query.Validate();

      var aQuery = from answer in db.Answer
        join answerMetadata in db.AnswerGlobalMeta on answer.AnswerGlobalMetaId equals answerMetadata.AnswerGlobalMetaId
        where answer.QuestionId == query.Dervied.QuestionId
        orderby answerMetadata.Votes descending
        select answer.AnswerId;

      aQuery = aQuery.Skip(query.Offset);

      if (query.Limit != null)
      {
        aQuery = aQuery.Take(query.Limit.Value + 1);
      }

      return await aQuery.ToListAsync();
    }

    public async Task<Answer> Execute(PangulDbContext db, GetAnswer query)
    {
      query.Validate();

      var answerQuery = db.Answer.Where(i => i.AnswerId == query.Dervied.AnswerId);

      if (!query.IgnoreRowVersion)
      {
        answerQuery = answerQuery.Where(i => i.RowVersion == query.Dervied.RowVersion);
      }

      var answer = await answerQuery.FirstOrDefaultAsync();
      await DerviePermissionsForInstance(query, answer);

      return answer;
    }

    public async Task<AnswerMeta> Execute(PangulDbContext db, GetAnswerMeta query)
    {
      query.Validate();

      return await db.AnswerMeta
        .Where(m => m.AnswerId == query.Derived.AnswerId && m.UserId == query.UserContext.User.UserId)
        .FirstOrDefaultAsync();
    }

    public async Task<AnswerGlobalMeta> Execute(PangulDbContext db, GetAnswerGlobalMeta query)
    {
      query.Validate();

      var queryStatement = from meta in db.AnswerGlobalMeta
        join answer in db.Answer on meta.AnswerGlobalMetaId equals answer.AnswerGlobalMetaId
        where answer.AnswerId == query.AnswerId
        select meta;

      return await queryStatement.FirstOrDefaultAsync();
    }

    private async Task DerviePermissionsForInstance(GetAnswer query, Answer answer)
    {
      if (answer == null) return;
      answer.CanEdit = await _internalUserPermissionService.HasWriteAccessFor(answer, query.UserContext);
    }
  }
}