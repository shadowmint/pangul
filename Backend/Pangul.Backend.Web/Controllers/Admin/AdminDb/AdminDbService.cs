using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Pangul.Backend.Web.Controllers.Admin.AdminDb.ViewModels;
using Pangul.Backend.Web.Core;

namespace Pangul.Backend.Web.Controllers.Admin.AdminDb
{
    public class AdminDbService
    {
        public Task<MigrationStatusViewModel> GetMigrationStatus()
        {
            using (var db = new ServiceDb())
            {
                var migrationsAssembly = db.GetService<IMigrationsAssembly>();
                var historyRepository = db.GetService<IHistoryRepository>();

                var all = migrationsAssembly.Migrations.Keys.ToList();
                var applied = historyRepository.GetAppliedMigrations().ToList();
                var pending = all.Except(applied.Select(i => i.MigrationId));

                return Task.FromResult(new MigrationStatusViewModel()
                {
                    MigrationsCompleted = applied.Count(),
                    MigrationsPending = pending.Count(),
                    LastApplied = applied[applied.Count - 1].MigrationId
                });
            }
        }
    }
}