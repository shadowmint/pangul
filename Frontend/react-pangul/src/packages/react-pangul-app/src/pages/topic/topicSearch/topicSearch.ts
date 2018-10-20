import { QuerySet } from "../../../../../react-pangul-core/src/domain/querySet";
import { QuestionSummary } from "../../../../../react-pangul-core/src/domain/questionSummary";
import { Topic } from "../../../../../react-pangul-core/src/domain/topic";
import { UserContext } from "../../../../../react-pangul-core/src/domain/userContext";
import { Page } from "../../../infrastructure/componentHelpers/page";

const DEFAULT_PAGE_SIZE = 5;

export interface ITopicViewQuestionProps {
    topic: string;
    search: string;
    user: UserContext;
}

interface ITopicHome {
    topic: Topic;
    search: string;
    pageSize: number;
    questions: QuerySet<QuestionSummary>;
}

export class TopicSearch extends Page<ITopicViewQuestionProps, ITopicHome> {
    constructor(forceUpdate: () => void) {
        super(forceUpdate);
    }

    public async search(value: string): Promise<void> {
        await this.update(async () => {
            return {search: value};
        });

        await this.refreshData();
    }

    public async next(): Promise<void> {
        await this.state.questions.next();
    }

    public async prev(): Promise<void> {
        await this.state.questions.prev();
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

            return {topic, search: fromProps.search};
        });
        await this.refreshData();
    }

    protected async refreshData(): Promise<void> {
        await this.update(async () => {
            const query = `topic:${this.state.topic.state.name} ${this.state.search}`;
            const questions = await QuestionSummary.search(query, this.state.pageSize);
            if (questions.error) {
                throw questions.error;
            }

            return {questions};
        });
    }

    protected blank(): ITopicHome {
        return {
            pageSize: DEFAULT_PAGE_SIZE,
            questions: new QuerySet<QuestionSummary>(),
            search: "",
            topic: new Topic(),
        };
    }

    protected rebind(): void {
        this.state.topic.parent = this;
        this.state.questions.parent = this;
    }
}
