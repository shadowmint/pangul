/*
import { Topic } from "../../../../../react-pangul-core/src/domain/topic";
import { UserContext } from "../../../../../react-pangul-core/src/domain/userContext";
import { Page } from "../../page";

export interface ITopicHomeDelta {
    loading?: boolean;
    topic?: Topic;
    error?: Error | null;
}

export interface ITopicHomeState {
    loading: boolean;
    topic: Topic;
    error: Error | null;
}

export interface ITopicHomeProps {
    topic: string;
    user: UserContext;
}

interface ITopicHome {
    topic: Topic;
}

export class TopicHome extends Page<ITopicHome, ITopicHomeDelta> {
    public load(fromProps: ITopicHomeProps): void {
        this.runAsync(async () => {
            // Start loading
            this.isLoaded = true;
            await this.setState({loading: true, error: null});

            // Fetch topic data
            const topic = await Topic.get(fromProps.topic);
            if (topic.error) {
                await this.setState({loading: false, error: this.error});
                return;
            }

            // Done
            await this.setState({loading: false, topic});
        });
    }

    protected blank(): ITopicHome {
        return {
            topic: new Topic(),
        };
    }

    protected rebind(): void {
        this.state.topic.parent = this;
    }
}
*/
