using Microsoft.EntityFrameworkCore;
using Pangul.Core.Data.Users;

namespace Pangul.Core.Data.Questions
{
  public class QuestionTag : VersionModel
  {
    public long QuestionTagId { get; set; }

    public virtual Question Question { get; set; }
    public long QuestionId { get; set; }

    public string Tag { get; set; }

    public static void BuildModel(ModelBuilder modelBuilder)
    {
      modelBuilder.Entity<QuestionTag>()
        .HasKey(b => b.QuestionTagId);

      modelBuilder.Entity<QuestionTag>()
        .Property(b => b.QuestionTagId)
        .ValueGeneratedOnAdd();

      modelBuilder.Entity<QuestionTag>()
        .HasOne(i => i.Question)
        .WithMany(i => i.Tags)
        .HasForeignKey(p => p.QuestionId);

      BuildVersionModel<QuestionTag>(modelBuilder);
    }
  }
}