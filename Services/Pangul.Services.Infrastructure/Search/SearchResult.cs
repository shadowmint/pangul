using System.Collections.Generic;

namespace Pangul.Services.Infrastructure.Search
{
  public class SearchResult
  {
    public bool MoreResults { get; set; }
    public List<long> IdentityList { get; set; }
    public bool HasResults => IdentityList != null && IdentityList.Count > 0;
  }
}