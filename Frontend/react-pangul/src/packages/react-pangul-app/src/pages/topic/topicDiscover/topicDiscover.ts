import {Subject} from "rxjs";
import {debounceTime} from "rxjs/operators";
import {QuerySet} from "../../../../../react-pangul-core/src/domain/querySet";
import {Topic} from "../../../../../react-pangul-core/src/domain/topic";
import {UserContext} from "../../../../../react-pangul-core/src/domain/userContext";
import {Page} from "../../page";

export interface ITopicDiscoverProps {
    search: string;
    user: UserContext;
}

interface ITopicDiscover {
    search: string;
    topics: QuerySet<Topic>;
}

export class TopicDiscover extends Page<ITopicDiscoverProps, ITopicDiscover> {
    private searchStream = new Subject<string>();

    constructor(forceUpdate: () => void) {
        super(forceUpdate);
        this.searchStream.pipe(debounceTime(200)).subscribe(async (value: string) => {
            await this.update(async () => {
                const topics = await Topic.search(value);
                if (topics.error) {
                    throw topics.error;
                }

                return {topics};
            });
        });
    }

    public async search(value: string): Promise<void> {
        this.searchStream.next(value);
        await this.update(async () => {
            return {search: value};
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
