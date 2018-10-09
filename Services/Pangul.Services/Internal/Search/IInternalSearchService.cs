using System.Threading.Tasks;
using Pangul.Core.Data;
using Pangul.Services.Infrastructure.Search;
using Pangul.Services.Model;

namespace Pangul.Services.Internal.Search
{
  public interface IInternalSearchService
  {
    /// <summary>
    /// Perform a query to find questions using the configured search strategy.
    /// </summary>
    Task<SearchResult> SearchQuestions(PangulDbContext db, UserContext userContext, string query, int offset, int limit);

    /// <summary>
    /// Perform a query to find topics using the configured search strategy.
    /// </summary>
    Task<SearchResult> SearchTopics(PangulDbContext db, UserContext userContext, string query, int offset, int limit);
  }
}