import * as React from "react";
import {Topic} from "../../../../../react-pangul-core/src/domain/topic";
import {TopicLink, TopicLinkType} from "../topicLink/topicLink";
import "./topicView.css";

export interface ITopicView {
    topic: Topic;
}

export class TopicView extends React.Component<ITopicView> {
    public render() {
        const description = this.props.topic.state.description || "no description";
        return (
            <div className="component--TopicView">
                <div>
                    <div>{this.props.topic.state.icon}</div>
                    <TopicLink topic={this.props.topic.state.name} target={TopicLinkType.View}>
                        <h2>{this.props.topic.state.name}</h2>
                    </TopicLink>
                </div>
                <div>{description}</div>
            </div>
        );
    }
}
