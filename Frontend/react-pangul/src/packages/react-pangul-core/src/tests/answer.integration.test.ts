import {Answer} from "../domain/answer";
import {Question} from "../domain/question";
import IntegrationTestFixture from "./fixtures/integrationTestFixture";

test("test answer question", async (done) => {
    await IntegrationTestFixture.get().withAuth("admin", "admin", async (user) => {
        const question = new Question();
        await question.update(async () => {
            return {
                tags: ["integrationTest"],
                title: "Sample question",
            };
        });

        await question.save();

        const answer = new Answer();
        await answer.update(async () => {
            return {
                body: "Some answer",
                questionId: question.state.questionId,
            };
        });

        await answer.save();

        expect(answer.error).toBeNull();
        expect(answer.state.answerId).not.toBeNull();
        expect(answer.state.questionId).toBe(question.state.questionId);
        done();
    });
});

test("test vote for answer", async (done) => {
    await IntegrationTestFixture.get().withAuth("admin", "admin", async (user) => {
        const question = new Question();
        await question.update(async () => {
            return {
                tags: ["integrationTest"],
                title: "Sample question",
            };
        });

        await question.save();

        const answer = new Answer();
        await answer.update(async () => {
            return {
                body: "Some answer",
                questionId: question.state.questionId,
            };
        });

        await answer.save();
        await answer.state.meta.voteUp();

        expect(answer.error).toBeNull();
        expect(answer.state.meta.state.votes).toBe(1);
        expect(answer.state.meta.state.global.votes).toBe(1);
        done();
    });
});

test("test get answers for question", async (done) => {
    await IntegrationTestFixture.get().withAuth("admin", "admin", async (user) => {
        const question = new Question();
        await question.update(async () => {
            return {
                tags: ["integrationTest"],
                title: "Sample question",
            };
        });

        await question.save();

        for (let i = 0; i < 6; i++) {
            const answer = new Answer();
            await answer.update(async () => {
                return {
                    body: "Some answer " + i,
                    questionId: question.state.questionId,
                };
            });

            await answer.save();
        }

        const answers = await Answer.search(question.state.questionId, 5);
        expect(answers.state.instances.length).toBe(5);
        expect(answers.state.moreResults).toBe(true);

        await answers.next();
        expect(answers.state.instances.length).toBe(1);
        expect(answers.state.moreResults).toBe(false);

        done();
    });
});
