using Pangul.Core.Data;

namespace Pangul.Core.Infrastructure
{
  public static class PangulDbContextExtensions
  {
    public static PangulDbTransaction WithTransaction(this PangulDbContext db)
    {
      return new PangulDbTransaction(db);
    }
  }
}