using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using MessagePack.Formatters;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Server.Kestrel.Transport.Libuv.Internal.Networking;
using NCore.Optional;
using NLog;
using Pangul.Backend.Web.Configuration.Settings;
using Pangul.Backend.Web.Controllers.Frontend.ViewModels;

namespace Pangul.Backend.Web.Controllers.Frontend
{
  public class FrontendControllerService
  {
    private readonly string _staticRoot;

    private static readonly Dictionary<string, FrontendStaticAssetViewModel> _cache = new Dictionary<string, FrontendStaticAssetViewModel>();

    public FrontendControllerService()
    {
      _staticRoot = new ServiceSettings().Folders.StaticAssetsFolder;
    }

    public FrontendStaticAssetViewModel ResolveStaticFrontendAsset(PathString requestPath)
    {
      return GetFile(requestPath)
        .Unwrap(() => GetFile("index.html")
          .Unwrap(() => throw new Exception("Unable to load any static assets")));
    }

    private Option<FrontendStaticAssetViewModel> GetFile(string requestPath)
    {
      var fileName = requestPath.Split("/").Reverse().FirstOrDefault();

      var loaded = GetCachedObject(fileName);
      if (loaded)
      {
        return loaded;
      }

      loaded = CacheExternalFile(fileName);
      if (loaded)
      {
        return loaded;
      }

      return Option.None<FrontendStaticAssetViewModel>();
    }

    private Option<FrontendStaticAssetViewModel> GetCachedObject(string path)
    {
      lock (_cache)
      {
        if (_cache.ContainsKey(path))
        {
          return Option.Some(_cache[path]);
        }
      }

      return Option.None<FrontendStaticAssetViewModel>();
    }

    private Option<FrontendStaticAssetViewModel> CacheExternalFile(string path)
    {
      var resolvedPath = Path.Combine(_staticRoot, path);
      if (File.Exists(resolvedPath))
      {
        if (path.EndsWith("html"))
        {
          return Option.Some(LoadTextFile(resolvedPath, "text/html"));
        }
        else if (path.EndsWith("json"))
        {
          return Option.Some(LoadTextFile(resolvedPath, "application/json"));
        }

        return Option.Some(LoadBinaryFile(resolvedPath));
      }

      return Option.None<FrontendStaticAssetViewModel>();
    }

    private FrontendStaticAssetViewModel LoadBinaryFile(string resolvedPath)
    {
      var bytes = File.ReadAllBytes(resolvedPath);
      var model = new FrontendStaticAssetViewModel()
      {
        Bytes = bytes,
        Filename = Path.GetFileName(resolvedPath)
      };
      CacheResolvedObject(model, resolvedPath);
      return model;
    }

    private FrontendStaticAssetViewModel LoadTextFile(string resolvedPath, string mimeType)
    {
      var text = File.ReadAllText(resolvedPath);
      var model = new FrontendStaticAssetViewModel()
      {
        Content = text,
        Filename = Path.GetFileName(resolvedPath),
        MimeType = mimeType
      };
      CacheResolvedObject(model, resolvedPath);
      return model;
    }

    private void CacheResolvedObject(FrontendStaticAssetViewModel model, string resolvedPath)
    {
      lock (_cache)
      {
        _cache[resolvedPath] = model;
      }
    }
  }
}