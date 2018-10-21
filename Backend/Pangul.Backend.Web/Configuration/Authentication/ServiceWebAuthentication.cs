using NCore.Base.WebAuth.Scheme;
using Pangul.Backend.Web.Configuration.Authentication.Policy;

namespace Pangul.Backend.Web.Configuration.Authentication
{
    public class ServiceWebAuthentication : AuthenticationServiceBuilderBase
    {
        public ServiceWebAuthentication() : base(ServiceAuthConsts.AuthenticationScheme)
        {
        }

        protected override void Configure()
        {
            AddPolicy<PangulUser>();
            AddPolicy<PangulAdmin>();
            AddPolicy<PangulAdminDatabase>();
            AddPolicy<PangulQuestionAsker>();
            AddPolicy<PolicyCanDeleteTopic>();
        }
    }
}