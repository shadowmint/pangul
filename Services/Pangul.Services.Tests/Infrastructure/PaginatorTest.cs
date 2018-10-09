using System.Collections.Generic;
using System.Linq;
using Pangul.Services.Infrastructure;
using Xunit;

namespace Pangul.Services.Tests.Infrastructure
{
  public class PaginatorTest
  {
    [Fact]
    public void TestPaginatorOverSimpleQuery()
    {
      StandardPaginationTests(new[]
      {
        new[] {1, 2, 3, 4, 5, 6, 7, 8, 9, 10}
      });
    }

    [Fact]
    public void TestPaginatorOverRealisticQuery()
    {
      StandardPaginationTests(new[]
      {
        new[] {1, 2, 3, 4, 5, 6, 7, 8},
        new[] {9, 10},
      });
    }

    [Fact]
    public void TestPaginatorOverComplexQuery()
    {
      StandardPaginationTests(new[]
      {
        new[] {1},
        new[] {2, 3},
        new[] {4, 5, 6, 7, 8},
        new[] {9, 10},
        new int[] { }
      });
    }

    private void StandardPaginationTests(IEnumerable<IList<int>> values)
    {
      var items = values.ToArray();

      var p0 = PaginatedResultSet.For(-10, 3, items);
      var p1 = PaginatedResultSet.For(0, 3, items);
      var p2 = PaginatedResultSet.For(1, 3, items);
      var p3 = PaginatedResultSet.For(2, 3, items);
      var p4 = PaginatedResultSet.For(3, 3, items);
      var p5 = PaginatedResultSet.For(4, 3, items);
      var p6 = PaginatedResultSet.For(1, 7, items);
      var p7 = PaginatedResultSet.For(0, 100, items);

      AssertPageDetails(p0, pages: 4, pageId: 0, items: new[] {1, 2, 3});
      AssertPageDetails(p1, pages: 4, pageId: 0, items: new[] {1, 2, 3});
      AssertPageDetails(p2, pages: 4, pageId: 1, items: new[] {4, 5, 6});
      AssertPageDetails(p3, pages: 4, pageId: 2, items: new[] {7, 8, 9});
      AssertPageDetails(p4, pages: 4, pageId: 3, items: new[] {10});
      AssertPageDetails(p5, pages: 4, pageId: 3, items: new[] {10});
      AssertPageDetails(p6, pages: 2, pageId: 1, items: new[] {8, 9, 10});
      AssertPageDetails(p7, pages: 1, pageId: 0, items: new[] {1, 2, 3, 4, 5, 6, 7, 8, 9, 10});
    }

    private static void AssertPageDetails(PaginatedResultSet<int> page, int pages, int pageId, int[] items)
    {
      Assert.Equal(pages, page.Pages);
      Assert.Equal(items.Length, page.Count);
      Assert.Equal(pageId, page.Page);
      Assert.Equal(items.Length, page.Items.Count());
      Assert.Equal(page.Items, items);
    }
  }
}