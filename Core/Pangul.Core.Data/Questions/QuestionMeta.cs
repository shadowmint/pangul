using Microsoft.EntityFrameworkCore;
using Pangul.Core.Data.Users;

namespace Pangul.Core.Data.Questions
{
  public class QuestionMeta : VersionModel
  {
    public long QuestionMetaId { get; set; }

    public long UserId { get; set; }
    public virtual User User { get; set; }

    public long QuestionId { get; set; }
    public virtual Question Question { get; set; }

    public int Votes { get; set; }
    public bool Star { get; set; }

    public static void BuildModel(ModelBuilder modelBuilder)
    {
      modelBuilder.Entity<QuestionMeta>()
        .HasKey(b => b.QuestionMetaId);

      modelBuilder.Entity<QuestionMeta>()
        .Property(b => b.QuestionMetaId)
        .ValueGeneratedOnAdd();

      modelBuilder.Entity<QuestionMeta>()
        .HasOne(i => i.User)
        .WithMany()
        .HasForeignKey(i => i.UserId);

      modelBuilder.Entity<QuestionMeta>()
        .HasOne(i => i.Question)
        .WithMany()
        .HasForeignKey(i => i.QuestionId);

      BuildVersionModel<QuestionMeta>(modelBuilder);
    }
  }
}