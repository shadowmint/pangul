import { Topic } from "../../../../../react-pangul-core/src/domain/topic";
import { UserContext } from "../../../../../react-pangul-core/src/domain/userContext";
import { Page } from "../../../infrastructure/componentHelpers/page";

export interface ITopicEditProps {
    topic: string;
    user: UserContext;
}

interface ITopicEdit {
    topic: Topic;
    notice: string | null;
}

export class TopicEdit extends Page<ITopicEditProps, ITopicEdit> {
    public async saveTopic() {
        await this.update(async () => {
            return Promise.resolve({notice: null});
        });
        await this.state.topic.save();
        if (this.state.topic.error === null) {
            await this.update(async () => {
                return Promise.resolve({notice: "Saved topic"});
            });
        }
    }

    protected async loadInitialData(fromProps: ITopicEditProps): Promise<void> {
        await this.update(async () => {
            const topic = await Topic.get(fromProps.topic);
            if (topic.error) {
                throw topic.error;
            }

            return {topic};
        });
    }

    protected blank(): ITopicEdit {
        return {
            notice: null,
            topic: new Topic(),
        };
    }

    protected rebind(): void {
        this.state.topic.parent = this;
    }
}
