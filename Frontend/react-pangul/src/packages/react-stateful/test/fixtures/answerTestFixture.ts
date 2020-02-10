import { Model } from "../../src/model";

export interface IAnswerTestFixture {
    answerId: string;
    title: string;
    body: string;
    tags: string[];
}

export class AnswerTestFixture extends Model<IAnswerTestFixture> {
    protected blank(): IAnswerTestFixture {
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