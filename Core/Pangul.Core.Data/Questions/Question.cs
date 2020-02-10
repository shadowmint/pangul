using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using Pangul.Core.Data.Topics;
using Pangul.Core.Data.Users;

namespace Pangul.Core.Data.Questions
{
  public class Question : VersionModel
  {
    public long QuestionId { get; set; }

    public virtual Topic Topic { get; set; }
    public long TopicId { get; set; }

    public virtual User User { get; set; }
    public long UserId { get; set; }

    public long QuestionGlobalMetaId { get; set; }
    public virtual QuestionGlobalMeta QuestionGlobalMeta { get; set; }

    public string Title { get; set; }
    public string Body { get; set; }

    public DateTimeOffset TimeCreated { get; set; }

    public virtual ICollection<QuestionMeta> Meta { get; set; }

    public virtual ICollection<QuestionTag> Tags { get; set; }

    /// <summary>
    /// This is a display only field to bind for the current active user without a view model.
    /// </summary>
    [NotMapped]
    public bool CanEdit { get; set; }

    public static void BuildModel(ModelBuilder modelBuilder)
    {
      modelBuilder.Entity<Question>()
        .HasKey(b => b.QuestionId);

      modelBuilder.Entity<Question>()
        .Property(b => b.QuestionId)
        .ValueGeneratedOnAdd();

      modelBuilder.Entity<Question>()
        .HasOne(i => i.User)
        .WithMany()
        .HasForeignKey(p => p.UserId);

      modelBuilder.Entity<Question>()
        .HasOne(i => i.Topic)
        .WithMany()
        .HasForeignKey(p => p.TopicId);

      modelBuilder.Entity<Question>()
        .Property(i => i.UserId)
        .IsRequired();

      modelBuilder.Entity<Question>()
        .Property(i => i.TopicId)
        .IsRequired();

      modelBuilder.Entity<Question>()
        .Property(i => i.TimeCreated)
        .IsRequired();

      BuildVersionModel<Question>(modelBuilder);
    }
  }
}