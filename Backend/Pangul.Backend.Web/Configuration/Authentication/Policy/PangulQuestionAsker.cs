using System.Collections.Generic;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using NCore.Base.WebAuth;

namespace Pangul.Backend.Web.Configuration.Authentication.Policy
{
    public class PangulQuestionAsker : IPolicy, IClaims
    {
        public void Require(AuthorizationPolicyBuilder policyOptions)
        {
            policyOptions.AuthenticationSchemes.Add(ServiceAuthConsts.AuthenticationScheme);
            policyOptions.RequireAuthenticatedUser();
            policyOptions.RequireClaim(ServiceAuthConsts.ClaimUserType, ServiceAuthConsts.ClaimUserTypeUser);
            policyOptions.RequireClaim(ServiceAuthConsts.ClaimCanCreate, ServiceAuthConsts.ClaimCanCreateQuestion);
        }

        public IEnumerable<Claim> Claims => new[]
        {
            new Claim(ServiceAuthConsts.ClaimCanCreate, ServiceAuthConsts.ClaimCanCreateQuestion)
        };

        string IPolicy.PolicyName => PolicyName;

        public const string PolicyName = "PangulQuestionAsker";
    }
}