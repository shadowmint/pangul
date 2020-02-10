using System;
using System.Collections.Generic;
using Pangul.Services;
using Pangul.Services.Internal;
using Pangul.Services.Services.Auth;

namespace Pangul.Services.Concrete.Services
{
    public class PangulAuthServiceBuilder : IPangulAuthServiceBuilder, IService
    {
        private readonly List<IPangulAuthProvider> _providers;

        public PangulAuthServiceBuilder()
        {
            _providers = new List<IPangulAuthProvider>();
        }

        public void ConfigureProvider(IPangulAuthProvider provider)
        {
            if (_providers.Contains(provider)) return;
            _providers.Add(provider);
        }

        public void Build(IPangulAuthService authService)
        {
            if (!(authService is IAuthServiceConfiguration configurable)) throw new Exception("IAuthService implementations must implement IAuthServiceConfiguration");
            if (configurable.IsConfigured) throw new Exception("IAuthService implementation is already configured");
            configurable.Configure(_providers);
        }
    }
}