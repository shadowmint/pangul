import {Model} from "../../../react-stateful/src/model";
import {AnswersController} from "../controllers/answersController";
import {AnswerMeta} from "./answerMeta";
import {IQueryResult, QuerySet} from "./querySet";
import {UserView} from "./userView";

export interface IAnswer {
    answerId: string;
    questionId: string;
    body: string;
    meta: AnswerMeta;
    rowVersion: string;
    userId: string;
    user: UserView;
}

export class Answer extends Model<IAnswer> {
    /** Return a answer instance */
    public static async get(answerId: string): Promise<Answer> {
        const answer = new Answer();
        answer.state.answerId = answerId;
        await answer.refresh();
        return answer;
    }

    /** Search for answers */
    public static search(questionId: string, pageSize: number = 10, page: number = 0): Promise<QuerySet<Answer>> {
        return QuerySet.fromQuery({
            fetchIds: Answer.searchForIds,
            fetchInstance: Answer.get,
            pageSize,
            query: questionId,
        }, page);
    }

    private static async searchForIds(questionId: string, offset: number, limit: number): Promise<IQueryResult> {
        const controller = new AnswersController();
        return await controller.search(questionId, offset, limit);
    }

    /** Refresh a answer instance */
    public async refresh(): Promise<void> {
        await this.update(async () => await this.fetchAnswerData(this.state.answerId));
    }

    /** Reset to the default state */
    public async reset(): Promise<void> {
        await this.update(async () => {
            return this.blank();
        });
    }

    /** Save a answer */
    public async save(): Promise<void> {
        const controller = new AnswersController();
        await this.update(async () => {
            const simpleState = {
                ...this.state,
            };
            delete simpleState.meta;
            if (!this.state.answerId) {
                const identity = await controller.add(simpleState);
                return await this.fetchAnswerData(identity.answerId);
            }
            await controller.update(simpleState);
            return await this.fetchAnswerData(this.state.answerId);
        });
    }

    /** Delete this answer, if you're allowed to */
    public async delete(): Promise<void> {
        await this.update(async () => {
            const controller = new AnswersController();
            await controller.delete(this.state.answerId);
            return this.blank();
        });
    }

    protected blank(): IAnswer {
        return {
            answerId: "",
            body: "...",
            meta: new AnswerMeta(),
            questionId: "",
            rowVersion: "",
            user: new UserView(),
            userId: "",
        };
    }

    protected async fetchAnswerData(answerId: string): Promise<IAnswer> {
        const controller = new AnswersController();
        const answerData = await controller.get(answerId);
        const meta = new AnswerMeta(await controller.getMetadata(answerId));
        const user = await UserView.get(answerData.userId);
        return {
            ...answerData,
            meta,
            user,
        };
    }

    protected rebind(): void {
        this.state.meta.parent = this;
    }

}
