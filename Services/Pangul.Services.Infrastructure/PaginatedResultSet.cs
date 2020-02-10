using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.InteropServices;
using System.Threading.Tasks;
using NCore.Optional;

namespace Pangul.Services.Infrastructure
{
  /// <summary>
  /// This query will only work over ordered query results, and only ensure atomic results for the given page.
  /// </summary>
  public class PaginatedResultSet<T>
  {
    private readonly ResultGroup[] _queries;

    private readonly int _pageSize;

    private int _page;

    private int _pages;

    private int _count;

    private T[] _items;

    private bool _resolved;

    public IEnumerable<T> Items
    {
      get
      {
        Fetch();
        return _items;
      }
    }

    public int Page
    {
      get
      {
        ResolveActualResultSetSize();
        return _page;
      }
    }

    public int Pages
    {
      get
      {
        ResolveActualResultSetSize();
        return _pages;
      }
    }

    public int Count
    {
      get
      {
        ResolveActualResultSetSize();
        return _count;
      }
    }

    public PaginatedResultSet(IEnumerable<IQueryable<T>> queries, int page, int pageSize)
    {
      if (page < 0) page = 0;
      if (pageSize <= 0) pageSize = 1;
      _queries = queries.Select(i => new ResultGroup {Query = i}).ToArray();
      _pageSize = pageSize;
      _page = page;
    }

    private void ResolveActualResultSetSize()
    {
      if (_resolved) return;
      _resolved = true;

      var total = 0;
      foreach (var query in _queries)
      {
        query.Count = query.Query.Count();
        total += query.Count;
      }

      _pages = (int) Math.Ceiling(total / (float) _pageSize);

      if (_page < 0)
      {
        _page = 0;
      }

      if (_page > _pages - 1)
      {
        _page = _pages - 1;
      }

      var endPoint = (_page + 1) * _pageSize;
      var startPoint = _page * _pageSize;
      if (endPoint > total)
      {
        endPoint = total;
      }

      _count = endPoint - startPoint;
    }

    private void ResolveResults()
    {
      if (_items != null) return;
      var toSkip = _pageSize * _page;
      var toTake = _pageSize;

      var results = new List<T>();

      foreach (var block in _queries)
      {
        if (toSkip > 0)
        {
          var skipThisRound = block.Count > toSkip ? toSkip : block.Count;
          var takeThisRound = block.Count > toSkip ? block.Count - toSkip : 0;
          takeThisRound = takeThisRound > toTake ? toTake : takeThisRound;
          toSkip -= skipThisRound;

          // Take any leftovers
          if (takeThisRound <= 0) continue;
          var result = block.Query.Skip(skipThisRound).Take(takeThisRound).ToArray();
          toTake -= result.Length;
          results.AddRange(result);
        }
        else
        {
          var takeThisRound = block.Count > toTake ? toTake : block.Count;
          var result = block.Query.Take(takeThisRound).ToArray();
          toTake -= result.Length;
          results.AddRange(result);
        }
      }

      _items = results.ToArray();
    }

    private class ResultGroup
    {
      public int Count { get; set; }
      public IQueryable<T> Query { get; set; }
    }

    /// <summary>
    /// Resolve any pending tasks so that the object can exist the enclosing db context scope.
    /// </summary>
    public PaginatedResultSet<T> Fetch()
    {
      ResolveActualResultSetSize();
      ResolveResults();
      return this;
    }
  }

  public static class PaginatedResultSet
  {
    public static PaginatedResultSet<T> For<T>(int page, int pageSize, params IQueryable<T>[] args)
    {
      return new PaginatedResultSet<T>(args, page, pageSize);
    }

    public static PaginatedResultSet<T> For<T>(int page, int pageSize, params IList<T>[] args)
    {
      return new PaginatedResultSet<T>(args.Select(i => i.AsQueryable()), page, pageSize);
    }
  }
}