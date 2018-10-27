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

    // Generic modification claims
    public const string ClaimCanDelete = "CanDelete";
    public const string ClaimCanCreate = "CanCreate";
    
    // Generic targets
    public const string ClaimTargetQuestion = "Question";
    public const string ClaimTargetTopic = "Topic";
    public const string ClaimTargetAnswer = "Answer";
    
    // The roles this admin is permitted to do.
    public static string ClaimAdminRoles = "AdminRoles";
    public const string ClaimAdminRolesView = "View";
    public const string ClaimAdminRolesDbAdmin = "DbAdmin";
  }
}