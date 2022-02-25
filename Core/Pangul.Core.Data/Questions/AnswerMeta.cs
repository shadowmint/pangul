using Microsoft.EntityFrameworkCore;
using Pangul.Core.Data.Users;

namespace Pangul.Core.Data.Questions
{
    public class AnswerMeta : VersionModel
    {
        public long AnswerMetaId { get; set; }
        
        public long AnswerId { get; set; }
        public virtual Answer? Answer { get; set; }

        public long UserId { get; set; }
        public virtual User? User { get; set; } 
        
        public int Votes { get; set; }
        
        public static void BuildModel(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<AnswerMeta>()
                .HasKey(b => b.AnswerMetaId);

            modelBuilder.Entity<AnswerMeta>()
                .Property(b => b.AnswerMetaId)
                .ValueGeneratedOnAdd();

            modelBuilder.Entity<AnswerMeta>()
                .HasOne(i => i.User)
                .WithMany()
                .HasForeignKey(i => i.UserId);
            
            modelBuilder.Entity<AnswerMeta>()
                .HasOne(i => i.Answer)
                .WithMany()
                .HasForeignKey(i => i.AnswerId);
   
            BuildVersionModel<AnswerMeta>(modelBuilder);
        }
    }
}