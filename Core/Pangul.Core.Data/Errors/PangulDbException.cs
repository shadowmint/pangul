using System;

namespace Pangul.Core.Data.Errors
{
  public class PangulDbException : Exception
  {
    public PangulDbExceptionCode Code { get; set; }

    public PangulDbException(PangulDbExceptionCode code, string message) : base(message)
    {
      Code = code;
    }

    public PangulDbException(PangulDbExceptionCode code, string message, Exception error) : base(message, error)
    {
      Code = code;
    }
  }
}