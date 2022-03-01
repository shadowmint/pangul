import { QuerySet } from "../../../../../react-pangul-core/src/domain/querySet";
import { Topic } from "../../../../../react-pangul-core/src/domain/topic";
import { UserContext } from "../../../../../react-pangul-core/src/domain/userContext";
import { Page } from "../../../infrastructure/componentHelpers/page";
import {QuestionSummary} from "../../../../../react-pangul-core/src/domain/questionSummary";

export interface TopicDiscoverProps {
    search: string;
    user: UserContext;
}

interface TopicDiscoverState {
    search: string;
    topics: QuerySet<Topic>;
    questions: QuerySet<QuestionSummary>;
}

export class TopicDiscover extends Page<TopicDiscoverProps, TopicDiscoverState> {
    constructor(forceUpdate: () => void) {
        super(forceUpdate);
    }

    public async search(value: string): Promise<void> {
        await this.update(async () => {
            return {search: value};
        });

        await this.update(async () => {
            const topics = await Topic.search(value);
            if (topics.error) {
                throw topics.error;
            }

            const query = `topic:* ${value}`;
            const questions = await QuestionSummary.search(query, 256);
            if (questions.error) {
                throw questions.error;
            }

            return {topics, questions};
        });
    }

    protected async loadInitialData(fromProps: TopicDiscoverProps): Promise<void> {
        await this.update(async () => {
            const topics = await Topic.search(fromProps.search);
            if (topics.error) {
                throw topics.error;
            }

            return {topics, search: fromProps.search};
        });
    }

    protected blank(): TopicDiscoverState {
        return {
            search: "",
            topics: new QuerySet<Topic>(),
            questions: new QuerySet<QuestionSummary>()
        };
    }

    protected rebind(): void {
        this.state.topics.parent = this;
    }
}
