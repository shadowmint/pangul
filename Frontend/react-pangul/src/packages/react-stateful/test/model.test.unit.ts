import { AnswerListTextFixture } from "./fixtures/answerListTextFixture";
import { AnswerTestFixture } from "./fixtures/answerTestFixture";
import { PageModel } from "./fixtures/pageModel";
import { Question } from "./fixtures/question";

test("test typed model", async () => {
    const model = new PageModel({
        answers: new AnswerListTextFixture({
            activeAnswers: [
                new AnswerTestFixture({
                    answerId: "2",
                    body: "World",
                    tags: ["one", "two"],
                    title: "Hello",
                }),
                new AnswerTestFixture({
                    answerId: "1",
                    body: "World",
                    tags: ["one", "two"],
                    title: "Hello",
                }),
            ],
            page: 0,
            pageSize: 10,
            pages: 1,
        }),
        question: new Question({
            body: "World",
            questionId: "0",
            tags: ["one", "two"],
            title: "Hello",
        }),
    });

    let changed = false;
    model.subscribe(() => {
        changed = true;
    });

    await model.loadQuestion("1");

    expect(changed).toBe(true);
    expect(model.state.question.state.questionId).toBe("1");
});
