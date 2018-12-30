using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using NCore.Optional;

namespace Pangul.Backend.Web.Infrastructure.Middleware
{
  internal class PangulSpaMiddlewareService
  {
    private readonly PangulSpaMiddlewareFileCache _cache;

    public PangulSpaMiddlewareService()
    {
      _cache = new PangulSpaMiddlewareFileCache();
    }

    public async Task<Option<PangulSpaMiddlewareServiceFileInfo>> GetStaticFileInfo(PathString requestPath, string[] rootFolders, int expireSeconds)
    {
      foreach (var rootFolder in rootFolders)
      {
        var fullPath = GetFullPath(requestPath, rootFolder);
        if (fullPath == null)
        {
          continue;
        }

        if (_cache.Exists(fullPath, expireSeconds))
        {
          return _cache.Get(fullPath);
        }

        if (!File.Exists(fullPath))
        {
          continue;
        }

        await _cache.PopulateFrom(fullPath);
        return _cache.Get(fullPath);
      }

      return Option.None<PangulSpaMiddlewareServiceFileInfo>();
    }

    private string GetFullPath(PathString requestPath, string rootFolder)
    {
      var partialPath = requestPath.ToString().TrimStart('/');
      var path = Path.GetFullPath(Path.Combine(rootFolder, partialPath));
      return !path.StartsWith(rootFolder) ? null : path;
    }
  }
}