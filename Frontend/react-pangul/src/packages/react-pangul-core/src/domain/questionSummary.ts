import {Model} from "../../../react-stateful/src/model";
import {QuestionsController} from "../controllers/questionsController";
import {IQueryResult, QuerySet} from "./querySet";
import {QuestionMeta} from "./questionMeta";
import {UserView} from "./userView";

export interface IQuestionSummary {
    canEdit: boolean;
    questionId: string;
    topic: string;
    title: string;
    summary: string;
    answer: string | null;
    tags: string[];
    user: UserView;
    meta: QuestionMeta;
}

export class QuestionSummary extends Model<IQuestionSummary> {
    /** Return a answer instance */
    public static async get(questionId: string): Promise<QuestionSummary> {
        const question = new QuestionSummary();
        question.state.questionId = questionId;
        await question.refresh();
        return question;
    }

    /** Search for topics */
    public static search(query: string, pageSize = 10, page = 0): Promise<QuerySet<QuestionSummary>> {
        return QuerySet.fromQuery({
            fetchIds: QuestionSummary.searchForIds,
            fetchInstance: QuestionSummary.get,
            pageSize,
            query,
        }, page);
    }

    private static async searchForIds(query: string, offset: number, limit: number): Promise<IQueryResult> {
        const controller = new QuestionsController();
        return await controller.search(query, offset, limit);
    }

    /** Refresh a answer instance */
    public async refresh(): Promise<void> {
        await this.update(async () => await this.fetchQuestionData(this.state.questionId));
    }

    protected blank(): IQuestionSummary {
        return {
            answer: null,
            canEdit: false,
            meta: new QuestionMeta(),
            questionId: "",
            summary: "...",
            tags: [],
            title: "new answer",
            topic: "default",
            user: new UserView(),
        };
    }

    protected async fetchQuestionData(questionId: string): Promise<IQuestionSummary> {
        const controller = new QuestionsController();
        const questionData = await controller.getSummary(questionId);
        const meta = new QuestionMeta(await controller.getMetadata(questionId));
        const user = await UserView.get(questionData.userId);
        return {
            ...questionData,
            meta,
            user,
        };
    }

    protected rebind(): void {
        this.state.meta.parent = this;
    }
}
