import { Question } from "../../../../../react-pangul-core/src/domain/question";
import { Topic } from "../../../../../react-pangul-core/src/domain/topic";
import { UserContext } from "../../../../../react-pangul-core/src/domain/userContext";
import { Page } from "../../page";

export interface ITopicEditQuestionProps {
    topic: string;
    question: string;
    user: UserContext;
}

interface ITopicEditQuestion {
    topic: Topic;
    question: Question;
    notice: string | null;
}

export class TopicEditQuestion extends Page<ITopicEditQuestionProps, ITopicEditQuestion> {
    protected async loadInitialData(fromProps: ITopicEditQuestionProps): Promise<void> {
        await this.update(async () => {
            const topic = await Topic.get(fromProps.topic);
            if (topic.error) {
                throw topic.error;
            }

            const question = await Question.get(fromProps.question);
            if (question.error) {
                throw question.error;
            }

            return {question, topic};
        });
    }

    protected blank(): ITopicEditQuestion {
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
