using System.Threading.Tasks;
using Pangul.Core.Data;
using Pangul.Services.Infrastructure.Search;
using Pangul.Services.Model;

namespace Pangul.Services.Search.Infrastructure
{
  public interface IQuestionSearchStrategy
  {
    /// <summary>
    /// Check if this provider is ready and configured?
    /// </summary>
    bool IsReadyForQuery(SearchQuery parsedQuery);

    /// <summary>
    /// Execute the query.
    /// </summary>
    Task<SearchResult> PerformQuery(SearchQuery parsedQuery, PangulDbContext db, UserContext user, int offset, int limit);
  }
}