using Microsoft.EntityFrameworkCore;

namespace Pangul.Core.Data.Questions
{
  public class AnswerGlobalMeta : VersionModel
  {    
    public long AnswerGlobalMetaId { get; set; }

    public virtual Answer? Answer { get; set; }
    
    public int Votes { get; set; }

    public static void BuildModel(ModelBuilder modelBuilder)
    {
      modelBuilder.Entity<AnswerGlobalMeta>()
        .HasKey(b => b.AnswerGlobalMetaId);

      modelBuilder.Entity<AnswerGlobalMeta>()
        .Property(b => b.AnswerGlobalMetaId)
        .ValueGeneratedOnAdd();

      modelBuilder.Entity<AnswerGlobalMeta>()
        .HasOne(i => i.Answer)
        .WithOne(i => i.AnswerGlobalMeta)
        .HasForeignKey<Answer>(p => p.AnswerGlobalMetaId);

      BuildVersionModel<AnswerGlobalMeta>(modelBuilder);
    }
  }
}