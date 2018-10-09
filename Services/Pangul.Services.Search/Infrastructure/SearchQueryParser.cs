using System.Collections.Generic;
using System.Linq;
using Pangul.Services.Infrastructure.Search;

namespace Pangul.Services.Search.Infrastructure
{
  public class SearchQueryParser
  {
    public SearchQuery Parse(string rawQuery, SearchType searchType)
    {
      return new SearchQuery()
      {
        Raw = rawQuery,
        Terms = GetTerms(rawQuery).ToArray(),
        Tokens = GetTokens(rawQuery).ToArray(),
        SearchType = searchType
      };
    }

    private IEnumerable<SearchToken> GetTokens(string rawQuery)
    {
      return rawQuery.Split(' ').Where(i => i.Contains(":")).Select(i => new SearchToken(i));
    }

    private IEnumerable<string> GetTerms(string rawQuery)
    {
      return rawQuery.Split(' ').Where(i => !i.Contains(":"));
    }
  }
}