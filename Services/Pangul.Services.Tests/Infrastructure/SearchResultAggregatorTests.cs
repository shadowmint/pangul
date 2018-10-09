using Pangul.Services.Search.Strategy;
using Xunit;

namespace Pangul.Services.Tests.Infrastructure
{
  public class SearchResultAggregatorTests
  {
    [Fact]
    public void TestSearchAggregate__WithTooManyResults__ReturnsHasMoreResults()
    {
      var aggregator = new SearchResultAggregator(0, 5);
      aggregator.Push(new long[] {1, 2});
      aggregator.Push(new long[] {3, 4});
      aggregator.Push(new long[] {5, 6});

      Assert.True(aggregator.TooManyResults);
      Assert.Equal(0, aggregator.Remaining);
    }

    [Fact]
    public void TestSearchAggregate__WithOffset__SkipsTheCorrectOffset()
    {
      var aggregator = new SearchResultAggregator(5, 5);
      aggregator.Push(new long[] {1, 2});
      aggregator.Push(new long[] {3, 4});
      aggregator.Push(new long[] {5, 6, 7});

      Assert.False(aggregator.TooManyResults);
      Assert.Equal(3, aggregator.Remaining);
      Assert.Equal(aggregator.Results, new long[] {6, 7});
    }

    [Fact]
    public void TestSearchAggregate__WithOffsetAndLimit__CorrectlyDeterminesThereAreTooManyResults()
    {
      var aggregator = new SearchResultAggregator(5, 5);
      aggregator.Push(new long[] {1, 2});
      aggregator.Push(new long[] {3, 4, 42});
      aggregator.Push(new long[] {5, 6, 7});
      aggregator.Push(new long[] {8, 9, 10});

      Assert.True(aggregator.TooManyResults);
      Assert.Equal(0, aggregator.Remaining);
      Assert.Equal(aggregator.Results, new long[] {5, 6, 7, 8, 9});
    }
  }
}