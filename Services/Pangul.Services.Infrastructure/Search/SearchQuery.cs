using System.Linq;

namespace Pangul.Services.Infrastructure.Search
{
  public class SearchQuery
  {
    public string Raw { get; set; }
    public string[] Terms { get; set; }
    public SearchToken[] Tokens { get; set; }
    public SearchType SearchType { get; set; }

    public void AddToken(SearchTokenType tokenType, string tokenValue)
    {
      var all = Tokens.ToList();
      all.Add(new SearchToken(tokenType, tokenValue));
      Tokens = all.ToArray();
    }
  }
}