import * as React from "react";
import { Topic } from "../../../../../react-pangul-core/src/domain/topic";
import { TopicLink, TopicLinkType } from "../topicLink/topicLink";
import "./topicView.css";

export interface ITopicView {
    topic: Topic;
}

const TopicIcon = (props: ITopicView) => {
    if (!props.topic.state.icon) {
        return <React.Fragment/>;
    }
    return (
        <div className="icon">
            <img src={props.topic.state.icon}/>
        </div>
    );
};

export class TopicView extends React.Component<ITopicView> {
    public render() {
        const description = this.props.topic.state.description || "no description";
        return (
            <div className="component--TopicView">
                <TopicIcon topic={this.props.topic}/>
                <div>
                    <div>
                        <TopicLink topic={this.props.topic.state.name} target={TopicLinkType.View}>
                            <h2>{this.props.topic.state.name}</h2>
                        </TopicLink>
                    </div>
                    <div>{description}</div>
                </div>
            </div>
        );
    }
}
