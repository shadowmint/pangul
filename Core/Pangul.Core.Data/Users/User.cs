using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Pangul.Core.Data.Questions;

namespace Pangul.Core.Data.Users
{
    public class User : VersionModel
    {
        public long UserId { get; set; }

        public virtual Login Login { get; set; }
        public long? LoginId { get; set; }

        public virtual UserContact UserContact { get; set; }
        public long UserContactId { get; set; }

        public static void BuildModel(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>()
                .HasKey(b => b.UserId);

            modelBuilder.Entity<User>()
                .Property(b => b.UserId)
                .ValueGeneratedOnAdd();

            modelBuilder.Entity<User>()
                .HasOne(i => i.Login)
                .WithOne(i => i.User);

            modelBuilder.Entity<User>()
                .HasOne(i => i.UserContact)
                .WithOne(i => i.User);

            BuildVersionModel<User>(modelBuilder);
        }
    }
}