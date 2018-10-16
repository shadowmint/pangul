import { Question } from "../domain/question";
import IntegrationTestFixture from "./fixtures/integrationTestFixture";

test("test create new answer", async (done) => {
    await IntegrationTestFixture.get().withAuth("admin", "admin", async (user) => {
        const question = new Question();
        await question.update(async () => {
            return {
                tags: ["integrationTest"],
                title: "Sample answer",
            };
        });

        await question.save();

        expect(question.error).toBeNull();
        expect(question.state.questionId).not.toBeNull();
        done();
    });
});

test("test get existing answer", async (done) => {
    await IntegrationTestFixture.get().withAuth("admin", "admin", async (user) => {
        const question = new Question();
        await question.update(async () => {
            return {
                tags: ["integrationTest"],
                title: "Sample answer",
            };
        });

        await question.save();

        const newQuestion = await Question.get(question.state.questionId);

        expect(question.state.title).toBe("Sample answer");
        expect(newQuestion.state.title).toBe("Sample answer");

        done();
    });
});

test("test update answer", async (done) => {
    await IntegrationTestFixture.get().withAuth("admin", "admin", async (user) => {
        const question = new Question();
        await question.update(async () => {
            return {
                tags: ["integrationTest"],
                title: "Sample answer",
            };
        });

        await question.save();

        await question.update(async () => {
            return {
                tags: ["integrationTest", "one", "two"],
                title: "Sample answer 2",
            };
        });

        await question.save();

        await question.update(async () => {
            return {
                tags: ["integrationTest", "three", "four"],
                title: "Sample answer 3",
            };
        });

        await question.save();

        const newQuestion = await Question.get(question.state.questionId);

        expect(newQuestion.state.title).toBe("Sample answer 3");
        expect(newQuestion.state.tags).toContain("three");

        done();
    });
});

test("test find topics", async (done) => {
    await IntegrationTestFixture.get().withAuth("admin", "admin", async (user) => {
        const question = new Question();
        await question.update(async () => {
            return {
                tags: ["integrationTest"],
                title: "Sample answer",
            };
        });

        await question.save();

        const querySet = await Question.search("tag:integrationTest", 10);
        expect(querySet.error).toBeNull();
        expect(querySet.state.instances.length).toBeGreaterThanOrEqual(1);

        done();
    });
});

test("test vote on answer", async () => {
    let qid = "";

    await IntegrationTestFixture.get().withAuth("admin", "admin", async (user) => {
        const question = new Question();
        await question.update(async () => {
            return {
                tags: ["integrationTest"],
                title: "Sample answer",
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

    // Now we should have two votes on the answer
    await IntegrationTestFixture.get().withAuth("admin", "admin", async (user) => {
        const question = await Question.get(qid);
        expect(question.state.meta.state.votes).toBe(1);
        expect(question.state.meta.state.global.votes).toBe(2);
    });
});

test("test search in topic for answer", async (done) => {
    await IntegrationTestFixture.get().withAuth("admin", "admin", async (user) => {
        const question = new Question();
        await question.update(async () => {
            return {
                tags: ["integrationTest"],
                title: "Sample answer IN DEMO",
                topic: "demo",
            };
        });

        await question.save();

        const matches = await Question.search("topic:demo DEMO");
        expect(matches.state.instances.length).toBeGreaterThanOrEqual(1);

        done();
    });
});

test("test search in any topic for answer", async (done) => {
    await IntegrationTestFixture.get().withAuth("admin", "admin", async (user) => {
        const question = new Question();
        await question.update(async () => {
            return {
                tags: ["integrationTest"],
                title: "Sample answer IN DEMO",
                topic: "demo",
            };
        });

        const question2 = new Question();
        await question2.update(async () => {
            return {
                tags: ["integrationTest"],
                title: "Sample answer ALSO IN DEMO",
                topic: "demo2",
            };
        });

        await question.save();
        await question2.save();

        const matches = await Question.search("topic:* DEMO");
        expect(matches.state.instances.length).toBeGreaterThanOrEqual(2);

        done();
    });
}, 5000);

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
