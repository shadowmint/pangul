import {Model} from "../../../react-stateful/src/model";
import {IQuestionData, QuestionsController} from "../controllers/questionsController";
import {IQueryResult, QuerySet} from "./querySet";
import {QuestionMeta} from "./questionMeta";
import {UserView} from "./userView";

export interface IQuestion {
    questionId: string;
    topic: string;
    title: string;
    body: string;
    tags: string[];
    userId: string;
    meta: QuestionMeta;
    user: UserView;
    canEdit: boolean;
    rowVersion: string;
}

export class Question extends Model<IQuestion> {
    /** Return a answer instance */
    public static async get(questionId: string): Promise<Question> {
        const question = new Question();
        question.state.questionId = questionId;
        await question.refresh();
        return question;
    }

    /** Search for topics */
    public static search(query: string, pageSize = 10, page = 0): Promise<QuerySet<Question>> {
        return QuerySet.fromQuery({
            fetchIds: Question.searchForIds,
            fetchInstance: Question.get,
            pageSize,
            query,
        }, page);
    }

    private static async searchForIds(query: string, offset: number, limit: number): Promise<IQueryResult> {
        const controller = new QuestionsController();
        return await controller.search(query, offset, limit);
    }

    /** Delete this answer and all it's answers and data */
    public async delete(): Promise<void> {
        const controller = new QuestionsController();
        await this.update(async () => {
            await controller.delete(this.state.questionId);
            return {
                questionId: "",
                rowVersion: "",
            };
        });
    }

    /** Refresh a answer instance */
    public async refresh(): Promise<void> {
        await this.update(async () => await this.fetchQuestionData(this.state.questionId));
    }

    /** Reset to the default state */
    public async reset(): Promise<void> {
        await this.update(async () => {
            return this.blank();
        });
    }

    /** Save an answer */
    public async save(): Promise<void> {
        const controller = new QuestionsController();
        await this.update(async () => {
            const simpleState:IQuestionData = {
                canEdit: this.state.canEdit,
                questionId: this.state.questionId,
                topic: this.state.topic,
                title: this.state.title,
                body: this.state.body,
                tags: this.state.tags,
                userId: this.state.userId,
                rowVersion: this.state.rowVersion,
            };
            if (!this.state.questionId) {
                const identity = await controller.add(simpleState);
                return await this.fetchQuestionData(identity.questionId);
            }
            await controller.update(simpleState);
            return await this.fetchQuestionData(this.state.questionId);
        });
    }

    protected blank(): IQuestion {
        return {
            body: "...",
            canEdit: false,
            meta: new QuestionMeta(),
            questionId: "",
            rowVersion: "",
            tags: [],
            title: "new question",
            topic: "default",
            user: new UserView(),
            userId: "",
        };
    }

    protected async fetchQuestionData(questionId: string): Promise<IQuestion> {
        const controller = new QuestionsController();
        const questionData = await controller.get(questionId);
        const meta = new QuestionMeta(await controller.getMetadata(questionId));
        const user = await UserView.get(questionData.userId);
        return {
            ...questionData,
            meta,
            user,
        };
    }

    protected rebind(): void {
        if (this.state.meta) {
            this.state.meta.parent = this;
        }
    }
}
