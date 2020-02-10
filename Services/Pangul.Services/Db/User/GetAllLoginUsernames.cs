using System.Collections.Generic;
using System.Linq;
using Pangul.Services.Actions;

namespace Pangul.Services.Db.User
{
    public class GetAllLoginUsernames : IQuery<IEnumerable<IQueryable<string>>>
    {
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