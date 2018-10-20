import { QuerySet } from "../../../../../react-pangul-core/src/domain/querySet";
import { Topic } from "../../../../../react-pangul-core/src/domain/topic";
import { UserContext } from "../../../../../react-pangul-core/src/domain/userContext";
import { Page } from "../../../infrastructure/componentHelpers/page";

export interface ITopicDiscoverProps {
    search: string;
    user: UserContext;
}

interface ITopicDiscover {
    search: string;
    topics: QuerySet<Topic>;
}

export class TopicDiscover extends Page<ITopicDiscoverProps, ITopicDiscover> {
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

            return {topics};
        });
    }

    protected async loadInitialData(fromProps: ITopicDiscoverProps): Promise<void> {
        await this.update(async () => {
            const topics = await Topic.search(fromProps.search);
            if (topics.error) {
                throw topics.error;
            }

            return {topics, search: fromProps.search};
        });
    }

    protected blank(): ITopicDiscover {
        return {
            search: "",
            topics: new QuerySet<Topic>(),
        };
    }

    protected rebind(): void {
        this.state.topics.parent = this;
    }
}
