using System.Threading.Tasks;

namespace Pangul.Services.Infrastructure
{
    public static class Deferred
    {
        /// <summary>
        /// Return a task for a concrete instance.
        /// </summary>
        public static Task<T> For<T>(T value)
        {
            var deferred = new TaskCompletionSource<T>();
            deferred.SetResult(value);
            return deferred.Task;
        }
    }
}