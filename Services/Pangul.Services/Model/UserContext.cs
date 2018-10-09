using System;
using Pangul.Core.Data.Users;

namespace Pangul.Services.Model
{
    /// <summary>
    /// Represents the current active user session for a user.
    /// </summary>
    public class UserContext : IDisposable
    {
        public Login Login { get; set; }
        public User User { get; set; }

        /// <summary>
        /// Bind any cleanup code here for this user.
        /// </summary>
        public event EventHandler EndContext;

        public void Dispose()
        {
            OnEndContext();
        }

        protected virtual void OnEndContext()
        {
            EndContext?.Invoke(this, EventArgs.Empty);
        }
    }
}