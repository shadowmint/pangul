import { Model } from "../../src/model";

export interface IQuestion {
    questionId: string;
    title: string;
    body: string;
    tags: string[];
}

export class Question extends Model<IQuestion> {
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