import {Topic} from "../domain/topic";
import IntegrationTestFixture from "./fixtures/integrationTestFixture";

test("test save topic", (done) => {
    (async () => {
        await IntegrationTestFixture.get().withAuth("admin", "admin", async (user) => {
            const topic = await Topic.get("default");
            await topic.update(async () => {
                return {
                    description: "Test topic",
                    icon: "data:image/gif;base64,bGhFQUFRQU1RQUFPUkhIT1ZTS3VkZk91bHJTT3AzV095RFp1NlFkdkNjaFBHb2xmMQ==",
                };
            });

            await topic.save();

            expect(topic.error).toBeNull();
            done();
        });
    })();
});

test("test delete topic", (done) => {
    (async () => {
        await IntegrationTestFixture.get().withAuth("admin", "admin", async (user) => {
            const topic = await Topic.get("deleteTest");
            await topic.delete();
            expect(topic.error).toBeNull();
            done();
        });
    })();
});

test("test search for topics", (done) => {
    (async () => {
        await IntegrationTestFixture.get().withAuth("admin", "admin", async (user) => {
            await Topic.get("one");
            await Topic.get("two");
            await Topic.get("three");
            await Topic.get("games");
            await Topic.get("other games");
            await Topic.get("dev");

            const topics = await Topic.search("games");
            expect(topics.error).toBeNull();
            expect(topics.state.moreResults).toBe(false);
            expect(topics.state.instances.length).toBe(2);

            const allTopics = await Topic.search("*", 50);
            expect(allTopics.error).toBeNull();
            expect(allTopics.state.instances.length).toBeGreaterThan(5);

            done();
        });
    })();
}, 5000);