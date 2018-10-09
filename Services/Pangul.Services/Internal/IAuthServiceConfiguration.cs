using System.Collections.Generic;
using Pangul.Services.Services.Auth;

namespace Pangul.Services.Internal
{
    public interface IAuthServiceConfiguration
    {
        /// <summary>
        /// Is the parent service already configured?
        /// </summary>
        bool IsConfigured { get; }

        /// <summary>
        /// Attempt to configure the parent service; should fail if IsConfigured return true.
        /// </summary>
        void Configure(IEnumerable<IPangulAuthProvider> authProviders);
    }
}