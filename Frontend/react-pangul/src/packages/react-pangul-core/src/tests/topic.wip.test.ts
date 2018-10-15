import { Question } from "../domain/question";
import IntegrationTestFixture from "./fixtures/integrationTestFixture";

test("test move answer to new topic", async (done) => {
    await IntegrationTestFixture.get().withAuth("admin", "admin", async (user) => {
        // Create
        const question = new Question();
        await question.update(async () => {
            return {
                tags: ["integrationTest"],
                title: "Sample answer IN DEMO",
                topic: "demo",
            };
        });
        await question.save();

        // Move
        await question.update(async () => {
            return {
                topic: "demo-moved",
            };
        });
        await question.save();

        // Check
        const questionClone = await Question.get(question.state.questionId);
        expect(questionClone.state.topic).toBe("demo-moved");

        done();
    });
}, 5000);
