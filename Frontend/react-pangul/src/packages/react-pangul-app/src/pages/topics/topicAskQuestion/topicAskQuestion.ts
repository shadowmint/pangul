import { Question } from "../../../../../react-pangul-core/src/domain/question";
import { Topic } from "../../../../../react-pangul-core/src/domain/topic";
import { UserContext } from "../../../../../react-pangul-core/src/domain/userContext";
import { Page } from "../../page";

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
    protected async loadInitialData(fromProps: ITopicAskQuestionProps): Promise<void> {
        await this.update(async () => {
            const topic = await Topic.get(fromProps.topic);
            if (topic.error) {
                throw topic.error;
            }
            return {question: new Question(), topic};
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
