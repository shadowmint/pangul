using System;

namespace Pangul.Services.Infrastructure.Errors
{
  public class CommandValidationException : Exception
  {
    public CommandValidationType FailureType { get; }

    public string FailureDetail { get; }

    public CommandValidationException(CommandValidationType failureType, string failureDetail) : base(MessageBuilder(failureType, failureDetail))
    {
      FailureType = failureType;
      FailureDetail = failureDetail;
    }

    public CommandValidationException(CommandValidationType failureType, string failureDetail, Exception innerException) : base(
      MessageBuilder(failureType, failureDetail), innerException)
    {
      FailureType = failureType;
      FailureDetail = failureDetail;
    }

    private static string MessageBuilder(CommandValidationType failureType, string data)
    {
      return $"{failureType}: {data}";
    }
  }
}