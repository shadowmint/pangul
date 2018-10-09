import { Question } from "../domain/question";
import IntegrationTestFixture from "./fixtures/integrationTestFixture";

test("test create new question", async (done) => {
    await IntegrationTestFixture.get().withAuth("admin", "admin", async (user) => {
        const question = new Question();
        await question.update(async () => {
            return {
                tags: ["integrationTest"],
                title: "Sample question",
            };
        });

        await question.save();

        expect(question.error).toBeNull();
        expect(question.state.questionId).not.toBeNull();
        done();
    });
});

test("test get existing question", async (done) => {
    await IntegrationTestFixture.get().withAuth("admin", "admin", async (user) => {
        const question = new Question();
        await question.update(async () => {
            return {
                tags: ["integrationTest"],
                title: "Sample question",
            };
        });

        await question.save();

        const newQuestion = await Question.get(question.state.questionId);

        expect(question.state.title).toBe("Sample question");
        expect(newQuestion.state.title).toBe("Sample question");

        done();
    });
});

test("test update question", async (done) => {
    await IntegrationTestFixture.get().withAuth("admin", "admin", async (user) => {
        const question = new Question();
        await question.update(async () => {
            return {
                tags: ["integrationTest"],
                title: "Sample question",
            };
        });

        await question.save();

        await question.update(async () => {
            return {
                tags: ["integrationTest", "one", "two"],
                title: "Sample question 2",
            };
        });

        await question.save();

        await question.update(async () => {
            return {
                tags: ["integrationTest", "three", "four"],
                title: "Sample question 3",
            };
        });

        await question.save();

        const newQuestion = await Question.get(question.state.questionId);

        expect(newQuestion.state.title).toBe("Sample question 3");
        expect(newQuestion.state.tags).toContain("three");

        done();
    });
});

test("test find questions", async (done) => {
    await IntegrationTestFixture.get().withAuth("admin", "admin", async (user) => {
        const question = new Question();
        await question.update(async () => {
            return {
                tags: ["integrationTest"],
                title: "Sample question",
            };
        });

        await question.save();

        const querySet = await Question.search("tag:integrationTest", 10);
        expect(querySet.error).toBeNull();
        expect(querySet.state.instances.length).toBeGreaterThanOrEqual(1);

        done();
    });
});

test("test vote on question", async () => {
    let qid = "";

    await IntegrationTestFixture.get().withAuth("admin", "admin", async (user) => {
        const question = new Question();
        await question.update(async () => {
            return {
                tags: ["integrationTest"],
                title: "Sample question",
            };
        });

        await question.save();
        qid = question.state.questionId;

        await question.state.meta.voteUp();
    });

    await IntegrationTestFixture.get().withAuth("admin", "admin", async (user) => {
        const question = await Question.get(qid);
        await question.state.meta.voteUp();
        expect(question.state.meta.state.votes).toBe(1);
        expect(question.state.meta.state.global.votes).toBe(1);
    });

    await IntegrationTestFixture.get().withAuth("doug", "doug", async (user) => {
        const question = await Question.get(qid);
        await question.state.meta.voteUp();
    });

    // Now we should have two votes on the question
    await IntegrationTestFixture.get().withAuth("admin", "admin", async (user) => {
        const question = await Question.get(qid);
        expect(question.state.meta.state.votes).toBe(1);
        expect(question.state.meta.state.global.votes).toBe(2);
    });
});

test("test search in topic for question", async (done) => {
    await IntegrationTestFixture.get().withAuth("admin", "admin", async (user) => {
        const question = new Question();
        await question.update(async () => {
            return {
                tags: ["integrationTest"],
                title: "Sample question IN DEMO",
                topic: "demo"
            };
        });

        await question.save();

        const matches = await Question.search("topic:demo DEMO");
        expect(matches.state.instances.length).toBeGreaterThanOrEqual(1);

        done();
    });
});

test("test search in any topic for question", async (done) => {
    await IntegrationTestFixture.get().withAuth("admin", "admin", async (user) => {
        const question = new Question();
        await question.update(async () => {
            return {
                tags: ["integrationTest"],
                title: "Sample question IN DEMO",
                topic: "demo"
            };
        });

        const question2 = new Question();
        await question2.update(async () => {
            return {
                tags: ["integrationTest"],
                title: "Sample question ALSO IN DEMO",
                topic: "demo2"
            };
        });

        await question.save();
        await question2.save();

        const matches = await Question.search("topic:* DEMO");
        expect(matches.state.instances.length).toBeGreaterThanOrEqual(2);

        done();
    });
}, 5000);

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