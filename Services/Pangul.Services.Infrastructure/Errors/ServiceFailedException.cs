using System;

namespace Pangul.Services.Infrastructure.Errors
{
    public class ServiceFailedException : PangulCommandFailedException
    {
        public ServiceFailedException(CommandFailureType failureType, string failureDetail) : base(failureType, failureDetail)
        {
        }

        public ServiceFailedException(CommandFailureType failureType, Exception failureDetail) : base(failureType, failureDetail)
        {
        }
    }
}