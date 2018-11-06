using System;

namespace Pangul.Backend.Web.Infrastructure.Errors
{
  public class WebRuntimeException : Exception
  {
    public WebRuntimeErrorType Error { get; }

    public WebRuntimeException(WebRuntimeErrorType error, string message) : base($"{error}: {message}")
    {
      Error = error;
    }
  }
}