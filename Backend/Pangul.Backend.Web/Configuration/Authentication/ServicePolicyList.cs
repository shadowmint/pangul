using NCore.Base.WebAuth.Scheme;
using Pangul.Backend.Web.Configuration.Authentication.Policy;

namespace Pangul.Backend.Web.Configuration.Authentication
{
    public class ServicePolicyList : AuthenticationServiceBuilderBase
    {
        public ServicePolicyList() : base(ServiceAuthConsts.AuthenticationScheme)
        {
        }

        protected override void Configure()
        {
            AddPolicy<PangulUser>();
            AddPolicy<PangulAdmin>();
            AddPolicy<PangulAdminDatabase>();
            AddPolicy<PolicyCanCreateQuestion>();
            AddPolicy<PolicyCanDeleteTopic>();
            AddPolicy<PolicyCanDeleteAnswer>();
            AddPolicy<PolicyCanDeleteQuestion>();
        }
    }
}