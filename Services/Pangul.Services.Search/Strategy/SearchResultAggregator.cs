using System.Collections.Generic;
using System.Linq;
using Pangul.Services.Infrastructure.Search;

namespace Pangul.Services.Search.Strategy
{
  public class SearchResultAggregator
  {
    public int Limit { get; }
    public int Offset { get; set; }
    public List<long> Results { get; set; }
    public bool TooManyResults { get; set; }
    public int Skipped { get; set; }
    public int Remaining => Limit - Results.Count;

    public SearchResultAggregator(int offset, int limit)
    {
      Results = new List<long>();
      Limit = limit;
      Offset = offset;
    }

    /// <summary>
    /// Return true when this aggregate has all the required items.
    /// </summary>
    public bool Push(IEnumerable<long> results)
    {
      // Remove any duplicates
      results = results.Where(i => !Results.Contains(i));
      
      // Short stop; if we have too many items return early
      var remainingItemsToConsume = Limit - Results.Count;
      if (remainingItemsToConsume <= 0) return true;

      // If we have an offset, the offset is reduced by each result set we've successfully skipped over.
      var remainingItemsToSkip = Offset - Skipped;
      var allItems = results.Take(remainingItemsToSkip + remainingItemsToConsume + 1).ToArray();

      // If we only skip this entire result set, do that and update the counts
      var itemsSkipped = allItems.Length >= remainingItemsToSkip ? remainingItemsToSkip : allItems.Length;
      Skipped += itemsSkipped;

      // This is now the left over of items we can actually consume
      var consumableItems = allItems.Skip(itemsSkipped).ToArray();

      // Take as many items from the consumables as we can
      var consumed = consumableItems.Take(remainingItemsToConsume).ToArray();

      // Update lists 
      if (consumed.Length > 0)
      {
        Results.AddRange(consumed);
      }

      // Were there extra items we discarded?
      if (consumableItems.Length > consumed.Length)
      {
        TooManyResults = true;
      }

      return Results.Count >= Limit;
    }

    public SearchResult AsResult()
    {
      return new SearchResult()
      {
        IdentityList = Results.ToList(),
        MoreResults = TooManyResults
      };
    }
  }
}