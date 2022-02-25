using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using Pangul.Core.Data.Traits;
using Pangul.Core.Data.Users;

namespace Pangul.Core.Data.Questions
{
    public class Answer : VersionModel, IUserAccessTrait
    {
        public long AnswerId { get; set; }

        public virtual Question? Question { get; set; }

        public long QuestionId { get; set; }

        public virtual User? User { get; set; }

        public long UserId { get; set; }

        public long AnswerGlobalMetaId { get; set; }
        public virtual AnswerGlobalMeta? AnswerGlobalMeta { get; set; }

        public string Body { get; set; } = "";

        [NotMapped] public bool CanEdit { get; set; }

        public static void BuildModel(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Answer>()
                .HasKey(b => b.AnswerId);

            modelBuilder.Entity<Answer>()
                .Property(b => b.AnswerId)
                .ValueGeneratedOnAdd();

            modelBuilder.Entity<Answer>()
                .HasOne(i => i.Question)
                .WithMany()
                .HasForeignKey(p => p.QuestionId);

            modelBuilder.Entity<Answer>()
                .HasOne(i => i.User)
                .WithMany()
                .HasForeignKey(p => p.UserId);

            BuildVersionModel<Answer>(modelBuilder);
        }
    }
}