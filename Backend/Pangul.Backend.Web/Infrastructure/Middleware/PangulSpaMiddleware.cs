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

namespace Pangul.Backend.Web.Infrastructure.Middleware
{
  public class PangulSpaMiddleware
  {
    private readonly RequestDelegate _next;
    private PangulSpaMiddlewareOptions _options;
    private Logger _logger;

    public PangulSpaMiddleware(RequestDelegate next, IOptions<PangulSpaMiddlewareOptions> options)
    {
      _next = next;
      _logger = LogManager.GetCurrentClassLogger();
      _options = options.Value;
    }


    public async Task Invoke(HttpContext context)
    {
      var requestPath = context.Request.Path;
      _logger.Info($"path: {requestPath}");

      // Ignore API routes, etc.
      if (_options.IgnoreRoutes.Any(i => requestPath.StartsWithSegments(i)))
      {
        await _next(context);
        return;
      }

      // Match static files in the root folder
      var fileInfo = await GetStaticFileInfo(requestPath, _options.StaticFolderRoot, _options.DefaultPath);
      if (fileInfo)
      {
        var details = fileInfo.Unwrap(new PangulSpaMiddlewareServiceFileInfo());
        _logger.Info($"Static file from SPA middleware: {details.Filename}: {details.MineType}: {details.Bytes.Length} bytes");
        //      context.Response.StatusCode = 500;
//        context.Response.ContentType = "text/html";
//        await context.Response.WriteAsync("Hello");


        // to stop futher pipeline execution 
//        return;
      }

      await _next(context);
    }

    private async Task<Option<PangulSpaMiddlewareServiceFileInfo>> GetStaticFileInfo(PathString requestPath, string rootFolder, string defaultPath)
    {
      var service = PangulSpaMiddlewareServiceFactory.GetStaticFileService();
      var info = await service.GetStaticFileInfo(requestPath, rootFolder);
      if (info)
      {
        return info;
      }

      return await service.GetStaticFileInfo(defaultPath, rootFolder);
    }
  }

  internal class PangulSpaMiddlewareService
  {
    private PangulSpaMiddlewareFileCache _cache;

    public PangulSpaMiddlewareService()
    {
      _cache = new PangulSpaMiddlewareFileCache();
    }

    public async Task<Option<PangulSpaMiddlewareServiceFileInfo>> GetStaticFileInfo(PathString requestPath, string rootFolder)
    {
      var fullPath = GetFullPath(requestPath, rootFolder);
      if (fullPath == null)
      {
        return Option.None<PangulSpaMiddlewareServiceFileInfo>();
      }

      if (_cache.Exists(fullPath))
      {
        return _cache.Get(fullPath);
      }

      if (File.Exists(fullPath))
      {
        await _cache.PopulateFrom(fullPath);
        return _cache.Get(fullPath);
      }

      return Option.None<PangulSpaMiddlewareServiceFileInfo>();
    }

    private string GetFullPath(PathString requestPath, string rootFolder)
    {
      var path = Path.GetFullPath(Path.Combine(rootFolder, requestPath));
      return !path.StartsWith(rootFolder) ? null : path;
    }
  }

  internal class PangulSpaMiddlewareFileCache
  {
    private readonly ConcurrentDictionary<string, PangulSpaMiddlewareServiceFileInfo> _cache = new ConcurrentDictionary<string, PangulSpaMiddlewareServiceFileInfo>();

    private readonly FileExtensionContentTypeProvider _contentTypeProvider = new FileExtensionContentTypeProvider();

    public bool Exists(string fullPath)
    {
      return _cache.ContainsKey(fullPath);
    }

    public Option<PangulSpaMiddlewareServiceFileInfo> Get(string fullPath)
    {
      return Exists(fullPath) ? Option.Some(_cache[fullPath]) : Option.None<PangulSpaMiddlewareServiceFileInfo>();
    }

    public async Task PopulateFrom(string fullPath)
    {
      var filename = Path.GetFileName(fullPath);
      _cache[fullPath] = new PangulSpaMiddlewareServiceFileInfo()
      {
        Filename = filename,
        MineType = MimeTypeFor(filename),
        Bytes = await File.ReadAllBytesAsync(fullPath)
      };
    }


    public string MimeTypeFor(string fileName)
    {
      string contentType;
      if (!_contentTypeProvider.TryGetContentType(fileName, out contentType))
      {
        contentType = "application/octet-stream";
      }

      return contentType;
    }
  }
}