using System.Collections.Generic;
using System.Threading.Tasks;
using Pangul.Core.Data;
using Pangul.Services.Infrastructure.Search;
using Pangul.Services.Internal.Search;
using Pangul.Services.Model;
using Pangul.Services.Search.Infrastructure;
using Pangul.Services.Search.Strategy;

namespace Pangul.Services.Concrete.Internal
{
  public class InternalSearchService : IInternalSearchService, IService
  {
    private readonly IList<IQuestionSearchStrategy> _searchers = new List<IQuestionSearchStrategy>();

    private readonly SearchQueryParser _parser;

    public InternalSearchService()
    {
      _parser = new SearchQueryParser();
      _searchers.Add(new DbQuestionSearchStrategy());
      _searchers.Add(new DbTopicSearchStrategy());
    }

    public async Task<SearchResult> SearchQuestions(PangulDbContext db, UserContext userContext, string query, int offset, int limit)
    {
      var parsedQuery = _parser.Parse(query, SearchType.Questions);
      foreach (var strategy in _searchers)
      {
        if (strategy.IsReadyForQuery(parsedQuery))
        {
          var results = await strategy.PerformQuery(parsedQuery, db, userContext, offset, limit);
          if (results.HasResults)
          {
            return results;
          }
        }
      }

      return new SearchResult
      {
        IdentityList = new List<long>(),
        MoreResults = false
      };
    }

    public async Task<SearchResult> SearchTopics(PangulDbContext db, UserContext userContext, string query, int offset, int limit)
    {
      var parsedQuery = _parser.Parse(query, SearchType.Topics);
      foreach (var strategy in _searchers)
      {
        if (strategy.IsReadyForQuery(parsedQuery))
        {
          var results = await strategy.PerformQuery(parsedQuery, db, userContext, offset, limit);
          if (results.HasResults)
          {
            return results;
          }
        }
      }

      return new SearchResult
      {
        IdentityList = new List<long>(),
        MoreResults = false
      };
    }
  }
}