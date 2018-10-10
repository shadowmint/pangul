import { Question } from "../../domain/question";
import IntegrationTestFixture from "../fixtures/integrationTestFixture";
import { Topic } from "../../domain/topic";

test("test purge test questions", async (done) => {
    // @ts-ignore
    await IntegrationTestFixture.get().withAuth("admin", "admin", async (user) => {

        const questions = await Question.search("topic:* tag:integrationTest");
        let purged = 0;

        while (true) {
            for (let i = 0; i < questions.state.instances.length; i++) {
                await questions.state.instances[i].delete();
                purged += 1;
            }

            await questions.fetch(0);
            if (questions.state.instances.length === 0 || purged > 100) {
                break;
            }
        }

        done();
    }, 60000);
});

test("test purge topics", async (done) => {
    // @ts-ignore
    await IntegrationTestFixture.get().withAuth("admin", "admin", async (user) => {
        const shouldPurge = [];
        const topic = await Topic.search("*", 10);
        do {
            for (let i = 0; i < topic.state.instances.length; i++) {
                const questions = await Question.search(`* topic:${topic.state.instances[i].state.name}`, 1);
                if (questions.state.instances.length === 0) {
                    shouldPurge.push(topic.state.instances[i]);
                }
            }
            if (topic.state.moreResults) {
                await topic.next();
            }
        } while (topic.state.moreResults);

        for (let i = 0; i < shouldPurge.length; i++) {
            await shouldPurge[i].delete();
        }
        done();
    }, 60000);
});