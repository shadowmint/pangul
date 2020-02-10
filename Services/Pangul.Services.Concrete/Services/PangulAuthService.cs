
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Pangul.Services;
using Pangul.Services.Internal;
using Pangul.Services.Services.Auth;

namespace Pangul.Services.Concrete.Services
{
    public class PangulAuthService : IPangulAuthService, IAuthServiceConfiguration, IStatefulService
    {
        private IList<IPangulAuthProvider> _providers;

        public bool IsConfigured => _providers != null;

        public async Task<bool> TryAuthorize<TAuth, TContext>(string username, TAuth authenticationToken, TContext authenticationContext)
        {
            if (!IsConfigured) return false;
            foreach (var provider in _providers)
            {
                if (await provider.TryAuthorize(username, authenticationToken, authenticationContext))
                {
                    return true;
                }
            }

            return false;
        }

        public void Configure(IEnumerable<IPangulAuthProvider> authProviders)
        {
            if (IsConfigured) throw new Exception("AuthService already configured");
            _providers = authProviders.ToList();
        }
    }
}