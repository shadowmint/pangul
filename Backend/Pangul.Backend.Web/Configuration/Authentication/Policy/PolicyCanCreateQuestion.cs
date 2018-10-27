using System.Collections.Generic;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using NCore.Base.WebAuth;

namespace Pangul.Backend.Web.Configuration.Authentication.Policy
{
    public class PolicyCanCreateQuestion : IPolicy, IClaims
    {
        public void Require(AuthorizationPolicyBuilder policyOptions)
        {
            policyOptions.AuthenticationSchemes.Add(ServiceAuthConsts.AuthenticationScheme);
            policyOptions.RequireAuthenticatedUser();
            policyOptions.RequireClaim(ServiceAuthConsts.ClaimUserType, ServiceAuthConsts.ClaimUserTypeUser);
            policyOptions.RequireClaim(ServiceAuthConsts.ClaimCanCreate, ServiceAuthConsts.ClaimTargetQuestion);
        }

        public IEnumerable<Claim> Claims => new[]
        {
            new Claim(ServiceAuthConsts.ClaimCanCreate, ServiceAuthConsts.ClaimTargetQuestion)
        };

        string IPolicy.PolicyName => PolicyName;

        public const string PolicyName = "PolicyCanAskQuestion";
    }
}