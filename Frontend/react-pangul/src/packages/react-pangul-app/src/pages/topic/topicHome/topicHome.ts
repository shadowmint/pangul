import {QuerySet} from "../../../../../react-pangul-core/src/domain/querySet";
import {QuestionSummary} from "../../../../../react-pangul-core/src/domain/questionSummary";
import {Topic} from "../../../../../react-pangul-core/src/domain/topic";
import {UserContext} from "../../../../../react-pangul-core/src/domain/userContext";
import {Page} from "../../page";

export interface ITopicViewQuestionProps {
    topic: string;
    user: UserContext;
}

interface ITopicHome {
    topic: Topic;
    questions: QuerySet<QuestionSummary>;
}

export class TopicHome extends Page<ITopicViewQuestionProps, ITopicHome> {
    protected async loadInitialData(fromProps: ITopicViewQuestionProps): Promise<void> {
        await this.update(async () => {
            const topic = await Topic.get(fromProps.topic);
            if (topic.error) {
                throw topic.error;
            }

            const questions = await QuestionSummary.search(`topic:${fromProps.topic} *`);
            if (questions.error) {
                throw questions.error;
            }

            return {questions, topic};
        });
    }

    protected blank(): ITopicHome {
        return {
            questions: new QuerySet<QuestionSummary>(),
            topic: new Topic(),
        };
    }

    protected rebind(): void {
        this.state.topic.parent = this;
        this.state.questions.parent = this;
    }
}
