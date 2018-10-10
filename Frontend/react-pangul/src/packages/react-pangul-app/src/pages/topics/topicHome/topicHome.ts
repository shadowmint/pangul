import {Topic} from "react-pangul-core/src/domain/topic";
import {Model} from "react-stateful/src/model";

interface ITopicHome {
    topic: Topic;
}

export class TopicHome extends Model<ITopicHome> {
    protected blank(): ITopicHome {
        return {
            topic: new Topic(),
        };
    }

    protected rebind(): void {
        this.state.topic.parent = this;
    }
}