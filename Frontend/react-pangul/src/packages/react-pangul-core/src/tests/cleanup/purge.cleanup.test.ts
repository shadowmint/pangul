import { Question } from "../../domain/question";
import { Topic } from "../../domain/topic";
import IntegrationTestFixture from "../fixtures/integrationTestFixture";

test("test purge test questions", async (done) => {
    // @ts-ignore
    await IntegrationTestFixture.get().withAuth("admin", "admin", async (user) => {

        const questions = await Question.search("topic:* tag:integrationTest");
        let purged = 0;

        while (true) {
            for (const instance of questions.state.instances) {
                await instance.delete();
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
            for (const instance of topic.state.instances) {
                const questions = await Question.search(`* topic:${instance.state.name}`, 1);
                if (questions.state.instances.length === 0) {
                    shouldPurge.push(instance);
                }
            }
            if (topic.state.moreResults) {
                await topic.next();
            }
        } while (topic.state.moreResults);

        for (const instance of shouldPurge) {
            await instance.delete();
        }
        done();
    }, 60000);
});