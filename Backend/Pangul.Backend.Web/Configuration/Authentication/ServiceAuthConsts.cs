using System.IO;

namespace Pangul.Backend.Web.Configuration.Authentication
{
  public static class ServiceAuthConsts
  {
    // Global authentication scheme
    public const string AuthenticationScheme = "Pangul";

    // User type claim
    public const string ClaimUserType = "UserType";
    public const string ClaimUserTypeUser = "User";
    
    // Question claims
    public const string ClaimCanCreate = "CanCreate";
    public const string ClaimCanCreateQuestion = "Question";
    
    /// The roles this admin is permitted to do.
    public static string ClaimAdminRoles = "AdminRoles";
    public const string ClaimAdminRolesView = "View";
    public const string ClaimAdminRolesDbAdmin = "DbAdmin";

  }
}