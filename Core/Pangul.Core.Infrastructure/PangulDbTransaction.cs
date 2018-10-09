using System;
using Microsoft.EntityFrameworkCore.Storage;
using Pangul.Core.Data;

namespace Pangul.Core.Infrastructure
{
  public class PangulDbTransaction : IDisposable
  {
    public PangulDbContext Db { get; }

    private readonly IDbContextTransaction _transaction;

    public PangulDbTransaction(PangulDbContext db)
    {
      Db = db;
      _transaction = Db.Database.BeginTransaction();
      Db.StartTransaction(_transaction);
    }

    public void Dispose()
    {
      try
      {
        Db.SaveChanges();
        _transaction.Commit();
        Db.ResolveTransaction();
      }
      finally
      {
        Db.Dispose();
      }
    }
  }
}