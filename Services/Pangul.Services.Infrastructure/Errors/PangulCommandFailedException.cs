using System;

namespace Pangul.Services.Infrastructure.Errors
{
    public class PangulCommandFailedException : Exception
    {
        public CommandFailureType FailureType { get; }

        public string FailureDetail { get; }

        public PangulCommandFailedException(CommandFailureType failureType, string failureDetail) : base(MessageBuilder(failureType, failureDetail))
        {
            FailureType = failureType;
            FailureDetail = failureDetail;
        }

        public PangulCommandFailedException(CommandFailureType failureType, Exception failureDetail) : base(MessageBuilder(failureType, failureDetail), failureDetail)
        {
            FailureType = failureType;
            FailureDetail = failureDetail.Message;
        }

        private static string MessageBuilder(CommandFailureType failureType, string failureDetail)
        {
            return $"{failureType}: {failureDetail}";
        }

        private static string MessageBuilder(CommandFailureType failureType, Exception failureDetail)
        {
            return $"{failureType}: {failureDetail.Message}";
        }
    }
}