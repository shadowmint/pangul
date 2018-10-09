using System;
using System.Linq;

namespace Pangul.Services.Infrastructure.Search
{
  public class SearchToken
  {
    public SearchToken(SearchTokenType tokenType, string tokenValue)
    {
      TokenType = tokenType;
      RawTokenType = tokenType.ToString();
      TokenValue = tokenValue;
    }

    public SearchToken(string rawToken)
    {
      var parts = rawToken.Split(':');
      RawTokenType = parts[0];
      if (Enum.TryParse<SearchTokenType>(RawTokenType, true, out var typedType))
      {
        TokenType = typedType;
      }

      TokenValue = string.Join(":", parts.Skip(1));
    }

    public SearchTokenType TokenType { get; }

    public string RawTokenType { get; }

    public string TokenValue { get; }
  }
}