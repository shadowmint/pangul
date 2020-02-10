using System;

namespace Pangul.Core.Infrastructure
{
  public static class PangulRowVersion
  {
    public static byte[] GetBytes(string rowVersion)
    {
      return rowVersion == null ? null : Guid.Parse(rowVersion).ToByteArray();
    }

    public static string GetString(byte[] rowVersion)
    {
      return rowVersion == null ? null : new Guid(rowVersion).ToString();
    }
  }
}