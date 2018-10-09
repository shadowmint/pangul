using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Pangul.Core.Data;
using Pangul.Services.Infrastructure.Search;
using Pangul.Services.Model;
using Pangul.Services.Search.Infrastructure;

namespace Pangul.Services.Search.Strategy
{
  /// <summary>
  /// Basic search service, don't use this unless elasticsearch is turned off.
  /// </summary>
  public class DbTopicSearchStrategy : IQuestionSearchStrategy
  {
    public bool IsReadyForQuery(SearchQuery parsedQuery)
    {
      return parsedQuery.SearchType == SearchType.Topics;
    }

    public async Task<SearchResult> PerformQuery(SearchQuery parsedQuery, PangulDbContext db, UserContext user, int offset, int limit)
    {
      var results = new SearchResultAggregator(offset, limit);

      if (results.Push(await MatchName(parsedQuery, db)))
      {
        return results.AsResult();
      }

      if (results.Push(await MatchAll(parsedQuery, db)))
      {
        return results.AsResult();
      }

      return results.AsResult();
    }

    private static async Task<IEnumerable<long>> MatchName(SearchQuery parsedQuery, PangulDbContext db)
    {
      var collectedResults = new List<long>();

      foreach (var term in parsedQuery.Terms)
      {
        collectedResults.AddRange(await db.Topic
          .Where(q => EF.Functions.Like(q.Name, $"%{term}%"))
          .OrderBy(i => i.TopicId)
          .Select(i => i.TopicId)
          .ToListAsync());
      }

      return collectedResults.Distinct().ToList();
    }

    private static async Task<IEnumerable<long>> MatchAll(SearchQuery parsedQuery, PangulDbContext db)
    {
      if (!parsedQuery.Terms.Contains("*"))
      {
        return new long[] { };
      }

      return await db.Topic
        .OrderBy(i => i.TopicId)
        .Select(i => i.TopicId)
        .ToListAsync();
    }
  }
}