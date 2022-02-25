using Microsoft.EntityFrameworkCore;

namespace Pangul.Core.Data.Questions
{
  public class QuestionGlobalMeta : VersionModel
  {    
    public long QuestionGlobalMetaId { get; set; }

    public virtual Question? Question { get; set; }
    
    public int Votes { get; set; }

    public static void BuildModel(ModelBuilder modelBuilder)
    {
      modelBuilder.Entity<QuestionGlobalMeta>()
        .HasKey(b => b.QuestionGlobalMetaId);

      modelBuilder.Entity<QuestionGlobalMeta>()
        .Property(b => b.QuestionGlobalMetaId)
        .ValueGeneratedOnAdd();

      modelBuilder.Entity<QuestionGlobalMeta>()
        .HasOne(i => i.Question)
        .WithOne(i => i.QuestionGlobalMeta)
        .HasForeignKey<Question>(p => p.QuestionGlobalMetaId);

      BuildVersionModel<QuestionGlobalMeta>(modelBuilder);
    }
  }
}