using System.Collections.Generic;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using NCore.Base.WebAuth;

namespace Pangul.Backend.Web.Configuration.Authentication.Policy
{
    public class PangulAdmin : IPolicy, IClaims
    {
        public void Require(AuthorizationPolicyBuilder policyOptions)
        {
            policyOptions.AuthenticationSchemes.Add(ServiceAuthConsts.AuthenticationScheme);
            policyOptions.RequireAuthenticatedUser();
            policyOptions.RequireClaim(ServiceAuthConsts.ClaimAdminRoles, ServiceAuthConsts.ClaimAdminRolesView);
        }

        public IEnumerable<Claim> Claims => new[]
        {
            new Claim(ServiceAuthConsts.ClaimAdminRoles, ServiceAuthConsts.ClaimAdminRolesView),
        };

        string IPolicy.PolicyName => PolicyName;

        public const string PolicyName = "PangulAdmin";
    }
}