import {Answer} from "../../../../../react-pangul-core/src/domain/answer";
import {Question} from "../../../../../react-pangul-core/src/domain/question";
import {Topic} from "../../../../../react-pangul-core/src/domain/topic";
import {UserContext} from "../../../../../react-pangul-core/src/domain/userContext";
import {Page} from "../../../infrastructure/componentHelpers/page";

export interface ITopicEditAnswerProps {
    topic: string;
    question: string;
    answer: string;
    user: UserContext;
}

interface ITopicEditAnswer {
    topic: Topic;
    question: Question;
    answer: Answer;
    notice: string | null;
}

export class TopicEditAnswer extends Page<ITopicEditAnswerProps, ITopicEditAnswer> {
    public async saveAnswer(): Promise<void> {
        await this.update(async () => {
            return Promise.resolve({notice: null});
        });
        await this.state.answer.save();
        if (this.state.answer.error === null) {
            await this.update(async () => {
                return Promise.resolve({notice: "Saved answer"});
            });
        }
    }

    protected async loadInitialData(fromProps: ITopicEditAnswerProps): Promise<void> {
        await this.update(async () => {
            const topic = await Topic.get(fromProps.topic);
            if (topic.error) {
                throw topic.error;
            }

            const question = await Question.get(fromProps.question);
            if (question.error) {
                throw question.error;
            }

            const answer = await Answer.get(fromProps.answer);
            if (answer.error) {
                throw answer.error;
            }

            if (answer.state.questionId !== question.state.questionId) {
                throw new Error("Invalid answer id for topic");
            }

            return {question, topic, answer};
        });
    }

    protected blank(): ITopicEditAnswer {
        return {
            answer: new Answer(),
            notice: null,
            question: new Question(),
            topic: new Topic(),
        };
    }

    protected rebind(): void {
        this.state.topic.parent = this;
        this.state.question.parent = this;
        this.state.answer.parent = this;
    }
}
