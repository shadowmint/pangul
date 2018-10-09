using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Pangul.Services.Tests.Fixtures;
using Pangul.Services.Tests.Helpers;
using Xunit;

namespace Pangul.Services.Tests.Infrastructure
{
  public class RowVersionTests
  {
    [Fact]
    public async Task RowVersionAutogen()
    {
      using (var fixture = new TestFixture())
      {
        await fixture.UserHelper.CreateUser("admin");
        await fixture.UserHelper.CreateUser("admin2");
        using (var db = new TestDbContext())
        {
          var users = await db.Users.Include(i => i.UserContact).ToListAsync();
          var versions = users.Select(i => new Guid(i.UserContact.RowVersion)).ToList();

          users.ForEach(i => i.UserContact.Email = "foo@foo.com");
          await db.SaveChangesAsync();

          users = await db.Users.Include(i => i.UserContact).ToListAsync();
          var versions2 = users.Select(i => new Guid(i.UserContact.RowVersion)).ToList();

          Assert.Equal(2, versions.Count);
          Assert.Equal(2, versions2.Count);

          var all = versions.ToList();
          all.AddRange(versions2);
          all = all.Distinct().ToList();
          Assert.Equal(4, all.Count);
        }
      }
    }

    [Fact]
    public async Task RowVersionScheme()
    {
      using (var fixture = new TestFixture())
      {
        await fixture.UserHelper.CreateUser("admin");
        await fixture.UserHelper.CreateUser("admin2");
        
        using (var staleContext = new TestDbContext())
        {
          // Lets fetch a user which will be our stale instance
          var someUser = await staleContext.Users.Include(i => i.UserContact).FirstAsync();
          var staleContact = someUser.UserContact;

          using (var context = new TestDbContext())
          {
            // Now, lets fetch the user in a different context and update it
            var sameUser = await context.Users.Where(i => i.UserId == someUser.UserId).Include(i => i.UserContact).FirstAsync();

            // Can save~
            var contact = sameUser.UserContact;
            contact.Email = "hello@world.com";
            await context.SaveChangesAsync();
          }

          // Back in this context will now have a stale row version
          await Assert.ThrowsAsync<DbUpdateConcurrencyException>(async () =>
          {
            staleContact.Email = "hello2@world.com";
            await staleContext.SaveChangesAsync();
          });
        }
      }
    }
  }
}