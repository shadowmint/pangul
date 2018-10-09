using System;
using System.Threading;
using System.Threading.Tasks;
using Pangul.Core.Data.Errors;

namespace Pangul.Core.Data
{
  public class PangulDbBackoffRetryRequest
  {
    private const int MaxRetryAttempts = 25;
    private const int MsBackoffPerAttempt = 100;

    public T Execute<T>(Func<T> action)
    {
      return ExecuteAsync(() => Task.FromResult(action())).Result;
    }

    public async Task<T> ExecuteAsync<T>(Func<Task<T>> action)
    {
      var offset = 0;
      var attempt = 0;
      while (attempt < MaxRetryAttempts)
      {
        try
        {
          return await action();
        }
        catch (Exception error)
        {
          if (IsTimeoutOrLock(error))
          {
            throw;
          }

          attempt += 1;
          offset += MsBackoffPerAttempt;
          await Sleep(offset);
        }
      }

      throw new PangulDbException(PangulDbExceptionCode.Timeout, $"Failed after {MaxRetryAttempts} attempts");
    }

    private static Task Sleep(int ms)
    {
      Thread.Sleep(ms);
      return Task.CompletedTask;
    }

    private static bool IsTimeoutOrLock(Exception error)
    {
      return !error.ToString().Contains("database is locked");
    }
  }
}