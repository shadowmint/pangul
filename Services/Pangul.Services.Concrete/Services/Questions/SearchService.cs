using System.Threading.Tasks;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Storage;
using Pangul.Core.Data;
using Pangul.Services.Actions;
using Pangul.Services.Db.Questions;
using Pangul.Services.Infrastructure.Search;
using Pangul.Services.Internal.Search;
using Pangul.Services.Model;
using Pangul.Services.Search.Strategy;
using Pangul.Services.Services.Questions;

namespace Pangul.Services.Concrete.Services.Questions
{
  public class SearchService : ISearchService, IService
  {
    private readonly IInternalSearchService _internalSearchService;
    private readonly IQueryHandler<GetAnswerIds, IEnumerable<long>> _getAnswerIds;

    public SearchService(IInternalSearchService internalSearchService, IQueryHandler<GetAnswerIds, IEnumerable<long>> getAnswerIds)
    {
      _internalSearchService = internalSearchService;
      _getAnswerIds = getAnswerIds;
    }

    public Task<SearchResult> SearchForQuestions(PangulDbContext db, UserContext context, string query, int offset, int limit)
    {
      return _internalSearchService.SearchQuestions(db, context, query, offset, limit);
    }

    public async Task<SearchResult> FindAnswersForQuestion(PangulDbContext db, UserContext user, string questionId, int offset, int limit)
    {
      // Normally the offset would be passed to the search aggregate, but in this case we already deal with that in the query.
      var aggregate = new SearchResultAggregator(0, limit);
      var ids = await _getAnswerIds.Execute(db, new GetAnswerIds()
      {
        UserContext = user,
        QuestionId = questionId,
        Limit = limit,
        Offset = offset
      });
      aggregate.Push(ids);
      return aggregate.AsResult();
    }
  }
}