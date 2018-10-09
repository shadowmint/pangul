import asyncTimeout from "./infrastructure/asyncTimeout";
import {Model} from "./model";

interface IQuestion {
    questionId: string;
    title: string;
    body: string;
    tags: string[];
}

interface IAnswer {
    answerId: string;
    title: string;
    body: string;
    tags: string[];
}

interface IAnswerList {
    activeAnswers: Answer[];
    page: number;
    pages: number;
    pageSize: number;
}

interface IPageModel {
    question: Question;
    answers: AnswerList;
}

class Question extends Model<IQuestion> {
    protected blank(): IQuestion {
        return {
            body: "",
            questionId: "",
            tags: [],
            title: "",
        };
    }

    protected rebind(): void {
        // Do nothing.
    }
}

class Answer extends Model<IAnswer> {
    protected blank(): IAnswer {
        return {
            answerId: "",
            body: "",
            tags: [],
            title: "",
        };
    }

    protected rebind(): void {
        // Do nothing;
    }
}

class AnswerList extends Model<IAnswerList> {
    protected blank(): IAnswerList {
        return {
            activeAnswers: [],
            page: 0,
            pageSize: 10,
            pages: 0,
        };
    }

    protected rebind(): void {
        this.state.activeAnswers.map((i) => i.parent = this);
    }
}

class PageModel extends Model<IPageModel> {
    public async loadQuestion(id: string) {
        await this.update(async () => {
            await this.state.question.update(async () => {
                await asyncTimeout(100); // fake ajax to get question and answers
                this.state.answers.update(async () => {
                    return {
                        activeAnswers: [
                            new Answer({
                                answerId: "2",
                                body: "World",
                                tags: ["one", "two"],
                                title: "Hello",
                            }),
                            new Answer({
                                answerId: "1",
                                body: "World",
                                tags: ["one", "two"],
                                title: "Hello",
                            }),
                        ],
                        page: 0,
                        pageSize: 10,
                        pages: 1,
                    };
                });
                return {
                    body: "World",
                    questionId: id,
                    tags: ["one", "two"],
                    title: "Hello",
                };
            });
            return null;
        });
    }

    protected blank(): IPageModel {
        return {
            answers: new AnswerList(),
            question: new Question(),
        };
    }

    protected rebind(): void {
        if (this.state.question) {
            this.state.question.parent = this;
        }
        this.state.answers.parent = this;
    }
}

test("test typed model", async () => {
    const model = new PageModel({
        answers: new AnswerList({
            activeAnswers: [
                new Answer({
                    answerId: "2",
                    body: "World",
                    tags: ["one", "two"],
                    title: "Hello",
                }),
                new Answer({
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