import {Model} from "react-stateful/src/model";
import {QuestionsController} from "../controllers/questionsController";

export interface IQuestionGlobalMeta {
    votes: number;
}

export interface IQuestionMeta {
    questionMetaId: string;
    questionId: string;
    rowVersion: string;
    star: boolean;
    votes: number;
    global: IQuestionGlobalMeta;
}

export class QuestionMeta extends Model<IQuestionMeta> {
    protected blank(): IQuestionMeta {
        return {
            global: {
                votes: 0,
            },
            questionId: "",
            questionMetaId: "",
            rowVersion: "",
            star: false,
            votes: 0,
        };
    }

    public async voteUp() {
        await this.update(async () => {
            const controller = new QuestionsController();
            await controller.updateMetadata({
                ...this.state,
                votes: 1
            });
            return await controller.getMetadata(this.state.questionId);
        });
    }

    public async voteNeutral() {
        await this.update(async () => {
            const controller = new QuestionsController();
            await controller.updateMetadata({
                ...this.state,
                votes: 0
            });
            return await controller.getMetadata(this.state.questionId);
        });
    }

    public async voteDown() {
        await this.update(async () => {
            const controller = new QuestionsController();
            await controller.updateMetadata({
                ...this.state,
                votes: -1
            });
            return await controller.getMetadata(this.state.questionId);
        });
    }

    public async addStar() {
        await this.update(async () => {
            const controller = new QuestionsController();
            await controller.updateMetadata({
                ...this.state,
                star: true
            });
            return await controller.getMetadata(this.state.questionId);
        });
    }

    public async removeStar() {
        await this.update(async () => {
            const controller = new QuestionsController();
            await controller.updateMetadata({
                ...this.state,
                star: false
            });
            return await controller.getMetadata(this.state.questionId);
        });
    }

    protected rebind(): void {
        // No child objects
    }
}