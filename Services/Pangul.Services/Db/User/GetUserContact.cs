using Pangul.Core.Data.Users;
using Pangul.Services.Actions;

namespace Pangul.Services.Db.User
{
    public class GetUserContact : IQuery<UserContact>
    {
        public long UserId { get; set; }
        
        public void GuardPropertyValues()
        {
            throw new System.NotImplementedException();
        }

        public void GuardRelatedObjects()
        {
            throw new System.NotImplementedException();
        }

        public void DeriveProperties()
        {
            throw new System.NotImplementedException();
        }
    }
}