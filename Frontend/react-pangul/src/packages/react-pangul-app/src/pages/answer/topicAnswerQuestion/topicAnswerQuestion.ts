import { Answer } from "../../../../../react-pangul-core/src/domain/answer";
import { Question } from "../../../../../react-pangul-core/src/domain/question";
import { Topic } from "../../../../../react-pangul-core/src/domain/topic";
import { UserContext } from "../../../../../react-pangul-core/src/domain/userContext";
import { Page } from "../../page";

export interface ITopicAnswerQuestionProps {
    topic: string;
    question: string;
    user: UserContext;
}

interface ITopicAnswerQuestion {
    topic: Topic;
    question: Question;
    answer: Answer;
    notice: string | null;
}

export class TopicAnswerQuestion extends Page<ITopicAnswerQuestionProps, ITopicAnswerQuestion> {
    protected async loadInitialData(fromProps: ITopicAnswerQuestionProps): Promise<void> {
        await this.update(async () => {
            const topic = await Topic.get(fromProps.topic);
            if (topic.error) {
                throw topic.error;
            }

            const question = await Question.get(fromProps.question);
            if (question.error) {
                throw question.error;
            }

            return {question, topic, answer: new Answer()};
        });
    }

    protected blank(): ITopicAnswerQuestion {
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
