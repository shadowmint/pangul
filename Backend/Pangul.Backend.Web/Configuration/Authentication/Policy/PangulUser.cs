using System.Collections.Generic;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using NCore.Base.WebAuth;

namespace Pangul.Backend.Web.Configuration.Authentication.Policy
{
    public class PangulUser : IPolicy, IClaims
    {
        public void Require(AuthorizationPolicyBuilder policyOptions)
        {
            policyOptions.AuthenticationSchemes.Add(ServiceAuthConsts.AuthenticationScheme);
            policyOptions.RequireAuthenticatedUser();
            policyOptions.RequireClaim(ServiceAuthConsts.ClaimUserType, ServiceAuthConsts.ClaimUserTypeUser);
        }

        public IEnumerable<Claim> Claims => new[]
        {
            new Claim(ServiceAuthConsts.ClaimUserType, ServiceAuthConsts.ClaimUserTypeUser)
        };

        string IPolicy.PolicyName => PolicyName;

        public const string PolicyName = "PangulUser";
    }
}