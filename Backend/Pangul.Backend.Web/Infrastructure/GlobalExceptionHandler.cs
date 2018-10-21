using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.Logging;
using NLog;

namespace Pangul.Backend.Web.Infrastructure
{
  public class GlobalExceptionFilter : IExceptionFilter
  {
    public void OnException(ExceptionContext context)
    {
      var logger = LogManager.GetCurrentClassLogger();
      logger.Error(context.Exception);
    }
  }
}