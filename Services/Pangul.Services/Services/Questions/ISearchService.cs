using System.Threading.Tasks;
using Pangul.Core.Data;
using Pangul.Services.Infrastructure.Search;
using Pangul.Services.Model;

namespace Pangul.Services.Services.Questions
{
  public interface ISearchService
  {
    /// <summary>
    /// Run a search for questions.
    /// </summary>
    Task<SearchResult> SearchForQuestions(PangulDbContext db, UserContext context, string query, int offset, int limit);

    /// <summary>
    /// Return an array of ids for answers matching the given question and request terms.
    /// </summary>
    Task<SearchResult> FindAnswersForQuestion(PangulDbContext db, UserContext user, string questionId, int offset, int limit);
  }
}