using Microsoft.EntityFrameworkCore;

namespace Pangul.Core.Data.Users
{
    public class UserContact : VersionModel
    {
        public long UserContactId { get; set; }

        public User User { get; set; }

        public string Firstname { get; set; }
        public string Lastname { get; set; }
        public string Email { get; set; }

        public static void BuildModel(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<UserContact>()
                .HasKey(b => b.UserContactId);

            modelBuilder.Entity<UserContact>()
                .Property(b => b.UserContactId)
                .ValueGeneratedOnAdd();

            BuildVersionModel<UserContact>(modelBuilder);
        }
    }
}