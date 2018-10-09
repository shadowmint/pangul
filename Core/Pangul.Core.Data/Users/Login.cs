using Microsoft.EntityFrameworkCore;

namespace Pangul.Core.Data.Users
{
    public class Login : VersionModel
    {
        public long LoginId { get; set; }

        public string Username { get; set; }
        
        public User User { get; set; }

        public static void BuildModel(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Login>()
                .HasKey(b => b.LoginId);

            modelBuilder.Entity<Login>()
                .Property(b => b.LoginId)
                .ValueGeneratedOnAdd();

            BuildVersionModel<Login>(modelBuilder);
        }
    }
}