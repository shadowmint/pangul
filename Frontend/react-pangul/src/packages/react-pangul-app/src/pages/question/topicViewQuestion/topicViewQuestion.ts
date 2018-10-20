import {Answer} from "../../../../../react-pangul-core/src/domain/answer";
import {QuerySet} from "../../../../../react-pangul-core/src/domain/querySet";
import {Question} from "../../../../../react-pangul-core/src/domain/question";
import {Topic} from "../../../../../react-pangul-core/src/domain/topic";
import {UserContext} from "../../../../../react-pangul-core/src/domain/userContext";
import {Page} from "../../../infrastructure/componentHelpers/page";

const DEFAULT_PAGE_SIZE = 5;

export interface ITopicViewQuestionProps {
    topic: string;
    question: string;
    user: UserContext;
}

interface ITopicViewQuestion {
    topic: Topic;
    question: Question;
    answers: QuerySet<Answer>;
    pageSize: number;
    notice: string | null;
}

export class TopicViewQuestion extends Page<ITopicViewQuestionProps, ITopicViewQuestion> {
    public async next(): Promise<void> {
        await this.update(async () => {
            await this.state.answers.next();
            return null;
        });
    }

    public async prev(): Promise<void> {
        await this.update(async () => {
            await this.state.answers.prev();
            return null;
        });
    }

    public async setPageSize(pageSize: number) {
        await this.update(async () => {
            return {pageSize};
        });
        await this.refreshData();
    }

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

            return {question, topic};
        });

        await this.refreshData();
    }

    protected blank(): ITopicViewQuestion {
        return {
            answers: new QuerySet<Answer>(),
            notice: null,
            pageSize: DEFAULT_PAGE_SIZE,
            question: new Question(),
            topic: new Topic(),
        };
    }

    protected rebind(): void {
        this.state.topic.parent = this;
        this.state.question.parent = this;
        this.state.answers.parent = this;
    }

    protected async refreshData(): Promise<void> {
        await this.update(async () => {
            const question = this.state.question;
            const answers = await Answer.search(question.state.questionId, this.state.pageSize);
            return {answers};
        });
    }
}
