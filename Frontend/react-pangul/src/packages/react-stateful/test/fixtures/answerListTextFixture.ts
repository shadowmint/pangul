import { Model } from "../../src/model";
import { AnswerTestFixture } from "./answerTestFixture";

export interface IAnswerListTestFixture {
    activeAnswers: AnswerTestFixture[];
    page: number;
    pages: number;
    pageSize: number;
}

export class AnswerListTextFixture extends Model<IAnswerListTestFixture> {
    protected blank(): IAnswerListTestFixture {
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
