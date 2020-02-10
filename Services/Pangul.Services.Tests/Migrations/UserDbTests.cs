using System.Threading.Tasks;
using Pangul.Services.Tests.Fixtures;
using Xunit;

namespace Pangul.Services.Tests.Migrations
{
    public class UserDbTests
    {
        [Fact]
        public async Task TestUserHelper()
        {
            using var fixture = new TestFixture();
            await fixture.UserHelper.CreateUser("admin");
        }
        
        [Fact]
        public async Task TestTopicHelper()
        {
            using var fixture = new TestFixture();
            await fixture.UserHelper.CreateUser("admin");
            await fixture.TopicHelper.RequireTopic("admin", "tests");
        }
        
        [Fact]
        public async Task TestQuestionHelper()
        {
            using var fixture = new TestFixture();
            await fixture.UserHelper.CreateUser("admin");
            await fixture.TopicHelper.RequireTopic("admin", "tests");
            var question = await fixture.QuestionHelper.CreateQuestion("admin", "question 123", "hello?", "tests");
            await fixture.QuestionHelper.VoteForQuestion("admin", question, 1);
        }
        
        [Fact]
        public async Task TesAnswerHelper()
        {
            using var fixture = new TestFixture();
            await fixture.UserHelper.CreateUser("admin");
            await fixture.TopicHelper.RequireTopic("admin", "tests");
            var question = await fixture.QuestionHelper.CreateQuestion("admin", "question 123", "hello?", "tests");
            await fixture.AnswerHelper.AnswerQuestion("admin", question, "Some body");
        }
    }
}