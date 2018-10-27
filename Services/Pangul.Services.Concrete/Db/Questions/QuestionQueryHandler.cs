using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Pangul.Core.Data;
using Pangul.Core.Data.Questions;
using Pangul.Services.Actions;
using Pangul.Services.Db.Questions;
using Pangul.Services.Infrastructure;
using Pangul.Services.Internal.User;

namespace Pangul.Services.Concrete.Db.Questions
{
  public class QuestionQueryHandler :
    IQueryHandler<GetUserQuestions, IEnumerable<IQueryable<Question>>>,
    IQueryHandler<GetQuestion, Question>,
    IQueryHandler<GetQuestionMeta, QuestionMeta>,
    IQueryHandler<GetQuestionGlobalMeta, QuestionGlobalMeta>
  {
    private readonly IInternalUserPermissionService _internalUserPermissionService;

    public QuestionQueryHandler(IInternalUserPermissionService internalUserPermissionService)
    {
      _internalUserPermissionService = internalUserPermissionService;
    }
    
    public Task<IEnumerable<IQueryable<Question>>> Execute(PangulDbContext context, GetUserQuestions query)
    {
      query.Validate();

      var dbResults = context.Question.Where(i => i.UserId == query.UserContext.User.UserId);
      var localResults = context.Question.Local.Where(i => i.UserId == query.UserContext.User.UserId).AsQueryable();

      return Deferred.For<IEnumerable<IQueryable<Question>>>(new[] {dbResults, localResults});
    }

    public async Task<Question> Execute(PangulDbContext db, GetQuestion query)
    {
      query.Validate();

      var qStatement = db.Question
        .Where(q => q.QuestionId == query.Derived.QuestionId);

      if (!query.IgnoreRowVersion)
      {
        qStatement = qStatement.Where(q => q.RowVersion == query.Derived.RowVersion);
      }

      if (query.LightWeightOnly)
      {
        return await qStatement.FirstOrDefaultAsync();
      }

      var question = await qStatement
        .Include(i => i.Tags)
        .Include(i => i.Meta)
        .Include(i => i.Topic)
        .FirstOrDefaultAsync();

      if (question != null)
      {
        question.CanEdit = await _internalUserPermissionService.HasWriteAccessFor(question, query.UserContext);
      }

      return question;
    }

    public async Task<QuestionMeta> Execute(PangulDbContext db, GetQuestionMeta query)
    {
      query.Validate();

      return await db.QuestionMeta
        .Where(q => q.Question.QuestionId == query.Derived.QuestionId && q.UserId == query.UserContext.User.UserId)
        .FirstOrDefaultAsync();
    }

    public Task<QuestionGlobalMeta> Execute(PangulDbContext db, GetQuestionGlobalMeta query)
    {
      query.Validate();

      var queryStatement = from meta in db.QuestionGlobalMeta
        join question in db.Question on meta.QuestionGlobalMetaId equals question.QuestionGlobalMetaId
        where question.QuestionId == query.QuestionId
        select meta;

      return queryStatement.FirstOrDefaultAsync();
    }
  }
}