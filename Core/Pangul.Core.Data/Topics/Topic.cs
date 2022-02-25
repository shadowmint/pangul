using System;
using Microsoft.EntityFrameworkCore;

namespace Pangul.Core.Data.Topics
{
  /// <summary>
  /// Topic a high level grouping of questions, equivalent to a subreddit.
  /// </summary>
  public class Topic : VersionModel
  {
    public const string DefaultTopic = "default";
    
    public long TopicId { get; set; }
    public string? Name { get; set; }
    public string? Description { get; set; } 
    public byte[]? Icon { get; set; }
    public string? IconType { get; set; }
    
    public DateTimeOffset TimeCreated { get; set; }

    public static void BuildModel(ModelBuilder modelBuilder)
    {
      modelBuilder.Entity<Topic>()
        .HasKey(b => b.TopicId);

      modelBuilder.Entity<Topic>()
        .Property(b => b.TopicId)
        .ValueGeneratedOnAdd();

      modelBuilder.Entity<Topic>()
        .Property(b => b.Name)
        .IsRequired();
      
      modelBuilder.Entity<Topic>()
        .HasIndex(b => b.Name)
        .IsUnique();
    
      modelBuilder.Entity<Topic>()
        .Property(i => i.TimeCreated)
        .IsRequired();

      BuildVersionModel<Topic>(modelBuilder);
    }
  }
}