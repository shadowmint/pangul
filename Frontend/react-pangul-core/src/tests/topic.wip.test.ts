import {Topic} from "../domain/topic";
import IntegrationTestFixture from "./fixtures/integrationTestFixture";
import { Question } from "../domain/question";

test("test move question to new topic", async (done) => {
    await IntegrationTestFixture.get().withAuth("admin", "admin", async (user) => {
        // Create
        const question = new Question();
        await question.update(async () => {
            return {
                tags: ["integrationTest"],
                title: "Sample question IN DEMO",
                topic: "demo"
            };
        });
        await question.save();

        // Move
        await question.update(async () => {
            return {
                topic: "demo-moved"
            };
        });
        await question.save();

        // Check
        const questionClone = await Question.get(question.state.questionId);
        expect(questionClone.state.topic).toBe("demo-moved")

        done();
    });
}, 5000);