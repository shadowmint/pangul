import { Answer } from "../../../../../react-pangul-core/src/domain/answer";
import { QuerySet } from "../../../../../react-pangul-core/src/domain/querySet";
import { Question } from "../../../../../react-pangul-core/src/domain/question";
import { Topic } from "../../../../../react-pangul-core/src/domain/topic";
import { UserContext } from "../../../../../react-pangul-core/src/domain/userContext";
import { Page } from "../../../infrastructure/componentHelpers/page";

export interface ITopicViewQuestionProps {
    topic: string;
    question: string;
    user: UserContext;
}

interface ITopicViewQuestion {
    topic: Topic;
    question: Question;
    answers: QuerySet<Answer>;
    notice: string | null;
}

export class TopicViewQuestion extends Page<ITopicViewQuestionProps, ITopicViewQuestion> {
    protected async loadInitialData(fromProps: ITopicViewQuestionProps): Promise<void> {
        await this.update(async () => {
            const topic = await Topic.get(fromProps.topic);
            if (topic.error) {
                throw topic.error;
            }

            const question = await Question.get(fromProps.question);
            if (question.error) {
                throw question.error;
            }

            const answers = await Answer.search(question.state.questionId);

            return {question, topic, answers};
        });
    }

    protected blank(): ITopicViewQuestion {
        return {
            answers: new QuerySet<Answer>(),
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
