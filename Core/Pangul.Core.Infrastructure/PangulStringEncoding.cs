using System;
using System.Text;
using System.Text.RegularExpressions;

namespace Pangul.Core.Infrastructure
{
  /// <summary>
  /// Always use the same binary encoding for values.
  /// </summary>
  public static class PangulStringEncoding
  {
    public static byte[] GetBytes(string value)
    {
      return Encoding.UTF8.GetBytes(value);
    }

    public static string GetString(byte[] bytes)
    {
      return Encoding.UTF8.GetString(bytes);
    }

    public static byte[] GetBytesFromDataUrl(string dataUrl)
    {
      if (dataUrl == null) return null;
      var base64Data = Regex.Match(dataUrl, @"data:(?<type>.+?),(?<data>.+)").Groups["data"].Value;
      return Convert.FromBase64String(base64Data);
    }

    public static string GetTypeFromDataUrl(string dataUrl)
    {
      return dataUrl == null ? null : Regex.Match(dataUrl, @"data:(?<type>.+?),(?<data>.+)").Groups["type"].Value;
    }

    public static string GetDataUrlFromBytes(byte[] bytes, string type)
    {
      if (bytes == null || type == null) return null;
      var data = Convert.ToBase64String(bytes);
      return $"data:{type},{data}";
    }
  }
}