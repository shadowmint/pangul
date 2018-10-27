import {Question} from "../../../../../react-pangul-core/src/domain/question";
import {Topic} from "../../../../../react-pangul-core/src/domain/topic";
import {UserContext} from "../../../../../react-pangul-core/src/domain/userContext";
import {Page} from "../../../infrastructure/componentHelpers/page";

export interface ITopicAskQuestionProps {
    topic: string;
    user: UserContext;
}

interface ITopicAskQuestion {
    topic: Topic;
    question: Question;
    notice: string | null;
}

export class TopicAskQuestion extends Page<ITopicAskQuestionProps, ITopicAskQuestion> {
    public async askQuestion() {
        await this.update(async () => {
            return Promise.resolve({notice: null});
        });
        await this.state.question.save();
        if (this.state.question.error === null) {
            await this.update(async () => {
                return Promise.resolve({notice: "Saved question"});
            });
        }
    }

    protected async loadInitialData(fromProps: ITopicAskQuestionProps): Promise<void> {
        await this.update(async () => {
            const topic = await Topic.get(fromProps.topic);
            if (topic.error) {
                throw topic.error;
            }

            const question = new Question();
            await question.update(async () => {
                return {topic: topic.state.name};
            });

            return {question, topic};
        });
    }

    protected blank(): ITopicAskQuestion {
        return {
            notice: null,
            question: new Question(),
            topic: new Topic(),
        };
    }

    protected rebind(): void {
        this.state.topic.parent = this;
        this.state.question.parent = this;
    }
}
