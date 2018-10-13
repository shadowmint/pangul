import asyncTimeout from "../../src/infrastructure/asyncTimeout";
import { Model } from "../../src/model";
import { AnswerListTextFixture } from "./answerListTextFixture";
import { AnswerTestFixture } from "./answerTestFixture";
import { Question } from "./question";

export interface IPageModel {
    question: Question;
    answers: AnswerListTextFixture;
}

export class PageModel extends Model<IPageModel> {
    public async loadQuestion(id: string) {
        await this.update(async () => {
            await this.state.question.update(async () => {
                await asyncTimeout(100); // fake ajax to get question and answers
                this.state.answers.update(async () => {
                    return {
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
            answers: new AnswerListTextFixture(),
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
