using System;
using System.Data;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage;
using Pangul.Core.Data.Errors;
using Pangul.Core.Data.Questions;
using Pangul.Core.Data.Topics;
using Pangul.Core.Data.Users;

namespace Pangul.Core.Data
{
  public abstract class PangulDbContext : DbContext
  {
    private IDbContextTransaction? _activeTransactionScope;

    // Logins & claims
    public DbSet<Login>? Logins { get; set; }

    // Users
    public DbSet<User>? Users { get; set; }
    public DbSet<UserContact>? UserContacts { get; set; }

    // Topics
    public DbSet<Topic>? Topic { get; set; }

    // Questions
    public DbSet<Question>? Question { get; set; }
    public DbSet<Answer>? Answer { get; set; }
    public DbSet<AnswerMeta>? AnswerMeta { get; set; }
    public DbSet<AnswerGlobalMeta>? AnswerGlobalMeta { get; set; }
    public DbSet<QuestionTag>? QuestionTag { get; set; }
    public DbSet<QuestionMeta>? QuestionMeta { get; set; }
    public DbSet<QuestionGlobalMeta>? QuestionGlobalMeta { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
      // Logins & claims
      Login.BuildModel(modelBuilder);

      // Users
      User.BuildModel(modelBuilder);
      UserContact.BuildModel(modelBuilder);

      // Topics
      Topics.Topic.BuildModel(modelBuilder);

      // Questions
      Questions.Question.BuildModel(modelBuilder);
      Data.Questions.Answer.BuildModel(modelBuilder);
      Data.Questions.AnswerMeta.BuildModel(modelBuilder);
      Data.Questions.AnswerGlobalMeta.BuildModel(modelBuilder);
      Questions.QuestionTag.BuildModel(modelBuilder);
      Data.Questions.QuestionMeta.BuildModel(modelBuilder);
      Data.Questions.QuestionGlobalMeta.BuildModel(modelBuilder);
    }

    public override int SaveChanges()
    {
      ApplyRowVersion();
      return new PangulDbBackoffRetryRequest().Execute(() => base.SaveChanges());
    }

    public override int SaveChanges(bool acceptAllChangesOnSuccess)
    {
      ApplyRowVersion();
      return new PangulDbBackoffRetryRequest().Execute(() => base.SaveChanges(acceptAllChangesOnSuccess));
    }

    public override Task<int> SaveChangesAsync(bool acceptAllChangesOnSuccess, CancellationToken cancellationToken = new CancellationToken())
    {
      ApplyRowVersion();
      return new PangulDbBackoffRetryRequest().ExecuteAsync(() => base.SaveChangesAsync(acceptAllChangesOnSuccess, cancellationToken));
    }

    public override Task<int> SaveChangesAsync(CancellationToken cancellationToken = new CancellationToken())
    {
      ApplyRowVersion();
      return new PangulDbBackoffRetryRequest().ExecuteAsync(() => base.SaveChangesAsync(cancellationToken));
    }

    private void ApplyRowVersion()
    {
      ChangeTracker.DetectChanges();
      foreach (var entry in ChangeTracker.Entries().Where(e => e.State == EntityState.Added || e.State == EntityState.Modified))
      {
        if (!(entry.Entity is VersionModel)) continue;
        foreach (var prop in entry.Properties.Where(i => i.Metadata.IsConcurrencyToken))
        {
          var nextValue = Guid.NewGuid().ToByteArray();
          prop.CurrentValue = nextValue;
          prop.IsModified = true;
          ((VersionModel) prop.EntityEntry.Entity).RowVersion = nextValue;
        }
      }
    }

    public void StartTransaction(IDbContextTransaction dbTransaction)
    {
      if (_activeTransactionScope != null)
      {
        throw new PangulDbException(PangulDbExceptionCode.InvalidTransaction, "A transaction is already in progress");
      }

      _activeTransactionScope = dbTransaction;
    }

    public void ResolveTransaction()
    {
      if (_activeTransactionScope == null)
      {
        throw new PangulDbException(PangulDbExceptionCode.InvalidTransaction, "No transaction is in progress");
      }
    }

    /// <summary>
    /// Some complex operation will fuckup the database if they are performed outside a transaction.
    /// Refuse to perform operations at all if the parent has not initialized a transaction for the current operation.
    /// </summary>
    public void RequireActiveTransaction()
    {
      if (_activeTransactionScope == null)
      {
        throw new PangulDbException(PangulDbExceptionCode.InvalidTransaction, "No transaction is in progress");
      }
    }

    /// <summary>
    /// Create a new inner scope of the same database interface.
    /// </summary>
    public abstract PangulDbContext CreateScope();
  }
}