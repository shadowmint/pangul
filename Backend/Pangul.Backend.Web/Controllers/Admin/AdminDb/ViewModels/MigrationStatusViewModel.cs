namespace Pangul.Backend.Web.Controllers.Admin.AdminDb.ViewModels
{
    public class MigrationStatusViewModel
    {
        public int MigrationsCompleted { get; set; }
        public int MigrationsPending { get; set; }
        public string LastApplied { get; set; }
    }
}