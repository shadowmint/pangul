using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Pangul.Core.Data;
using Pangul.Core.Data.Users;
using Pangul.Services.Actions;
using Pangul.Services.Db.User;
using Pangul.Services.Infrastructure.Errors;

namespace Pangul.Services.Concrete.Db.Users
{
    public class UserCommandHandler : ICommandHandler<CreateNewUser>
    {
        public async Task Execute(PangulDbContext context, CreateNewUser command)
        {
            command.Validate();
            await GuardNoExistingLogin(context, command);

            // Make or find user
            var user = await context.Users.FirstOrDefaultAsync(i => i.Login.Username == command.Username) ?? new User()
            {
                UserContact = new UserContact()
                {
                    Email = "",
                    Firstname = "",
                    Lastname = ""
                }
            };

            // Create login
            var login = new Login()
            {
                Username = command.Username,
                User = user
            };

            context.Logins.Add(login);
        }

        private static async Task GuardNoExistingLogin(PangulDbContext context, CreateNewUser command)
        {
            var conflictingLogin = await context.Logins.FirstOrDefaultAsync(i => i.Username == command.Username);
            if (conflictingLogin != null)
            {
                throw new PangulCommandFailedException(CommandFailureType.ConflictingData, "Specified login already exists");
            }
        }
    }
}