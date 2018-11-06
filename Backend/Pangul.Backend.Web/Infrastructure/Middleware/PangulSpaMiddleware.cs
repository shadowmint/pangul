using System;
using System.Collections.Concurrent;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.StaticFiles;
using Microsoft.Extensions.Options;
using NCore.Optional;
using NLog;
using NLog.Fluent;

namespace Pangul.Backend.Web.Infrastructure.Middleware
{
  public class PangulSpaMiddleware
  {
    private readonly RequestDelegate _next;
    private PangulSpaMiddlewareOptions _options;
    private Logger _logger;

    public PangulSpaMiddleware(RequestDelegate next, PangulSpaMiddlewareOptions options)
    {
      _next = next;
      _logger = LogManager.GetCurrentClassLogger();
      _options = options;
    }


    public async Task Invoke(HttpContext context)
    {
      var requestPath = context.Request.Path;
      _logger.Info($"path: {requestPath}");

      try
      {
        // Ignore API routes, etc.
        if (_options.IgnoreRoutes.Any(i => requestPath.StartsWithSegments(i)))
        {
          _logger.Info($"Static file from SPA middleware: {requestPath} -> Skip, ignore list");
          await _next(context);
          return;
        }

        // Match static files in the root folder
        var fileInfo = await GetStaticFileInfo(requestPath, _options.StaticFolderRoot, _options.DefaultPath);
        if (fileInfo)
        {
          var details = fileInfo.Unwrap(new PangulSpaMiddlewareServiceFileInfo());
          _logger.Info($"Static file from SPA middleware: {requestPath} -> {details.Filename}: {details.MineType}: {details.Bytes.Length} bytes");
          context.Response.StatusCode = 200;
          context.Response.ContentType = details.MineType;
          await context.Response.Body.WriteAsync(details.Bytes);
          return;
        }
      }
      catch (Exception error)
      {
        _logger.Error(error);
      }

      await _next(context);
    }

    private async Task<Option<PangulSpaMiddlewareServiceFileInfo>> GetStaticFileInfo(PathString requestPath, string rootFolder, string defaultPath)
    {
      var service = PangulSpaMiddlewareServiceFactory.GetStaticFileService();
      var info = await service.GetStaticFileInfo(requestPath, rootFolder, _options.ExpireSeconds);
      if (info)
      {
        return info;
      }

      return await service.GetStaticFileInfo(defaultPath, rootFolder, _options.ExpireSeconds);
    }
  }

  internal class PangulSpaMiddlewareFileCache
  {
    private readonly ConcurrentDictionary<string, PangulSpaMiddlewareServiceFileInfo> _cache =
      new ConcurrentDictionary<string, PangulSpaMiddlewareServiceFileInfo>();

    private readonly FileExtensionContentTypeProvider _contentTypeProvider = new FileExtensionContentTypeProvider();

    public bool Exists(string fullPath, int expireSeconds)
    {
      var expiry = DateTimeOffset.Now - TimeSpan.FromSeconds(expireSeconds);
      return _cache.ContainsKey(fullPath) && _cache[fullPath].Created > expiry;
    }

    public Option<PangulSpaMiddlewareServiceFileInfo> Get(string fullPath)
    {
      return Exists(fullPath, 1000) ? Option.Some(_cache[fullPath]) : Option.None<PangulSpaMiddlewareServiceFileInfo>();
    }

    public async Task PopulateFrom(string fullPath)
    {
      var filename = Path.GetFileName(fullPath);
      _cache[fullPath] = new PangulSpaMiddlewareServiceFileInfo()
      {
        Filename = filename,
        MineType = MimeTypeFor(filename),
        Bytes = await File.ReadAllBytesAsync(fullPath),
        Created = DateTimeOffset.Now
      };
    }

    private string MimeTypeFor(string fileName)
    {
      if (!_contentTypeProvider.TryGetContentType(fileName, out var contentType))
      {
        contentType = "application/octet-stream";
      }

      return contentType;
    }
  }
}