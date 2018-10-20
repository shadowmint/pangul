import {Model} from "../../../react-stateful/src/model";
import {AnswersController} from "../controllers/answersController";

export interface IAnswerGlobalMeta {
    votes: number;
}

export interface IAnswerMeta {
    answerMetaId: string;
    answerId: string;
    rowVersion: string;
    votes: number;
    global: IAnswerGlobalMeta;
}

export class AnswerMeta extends Model<IAnswerMeta> {

    public async voteUp() {
        await this.update(async () => {
            const controller = new AnswersController();
            await controller.updateMetadata({
                ...this.state,
                votes: 1,
            });
            return await controller.getMetadata(this.state.answerId);
        });
    }

    public async voteNeutral() {
        await this.update(async () => {
            const controller = new AnswersController();
            await controller.updateMetadata({
                ...this.state,
                votes: 0,
            });
            return await controller.getMetadata(this.state.answerId);
        });
    }

    public async voteDown() {
        await this.update(async () => {
            const controller = new AnswersController();
            await controller.updateMetadata({
                ...this.state,
                votes: -1,
            });
            return await controller.getMetadata(this.state.answerId);
        });
    }

    protected blank(): IAnswerMeta {
        return {
            answerId: "",
            answerMetaId: "",
            global: {
                votes: 0,
            },
            rowVersion: "",
            votes: 0,
        };
    }

    protected rebind(): void {
        // No child objects
    }
}
