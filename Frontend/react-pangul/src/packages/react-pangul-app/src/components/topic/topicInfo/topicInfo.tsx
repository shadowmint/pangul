import * as React from "react";
import { ITopic } from "../../../../../react-pangul-core/src/domain/topic";
import { TopicLink, TopicLinkType } from "../topicLink/topicLink";
import "./topicInfo.css";

const TopicDescription = (props: ITopic) => {
    if (props.topicId) {
        const desc = props.description || "no description";
        return (
            <div className="desc">
                <TopicLink target={TopicLinkType.Edit} topic={props.name}>
                    {desc}
                </TopicLink>
            </div>
        );
    }
    return (
        <div className="desc"/>
    );
};

const TopicIcon = (props: ITopic) => {
    if (!props.icon) {
        return <React.Fragment/>;
    }
    return (
        <div className="icon">
            <img src={props.icon}/>
        </div>
    );
};

export class TopicInfo extends React.Component<ITopic> {
    public render() {
        const name = this.props.name || "no topic";

        return (
            <div className="component--TopicInfo">
                <TopicIcon {...this.props}/>
                <div>
                    <TopicLink target={TopicLinkType.View} topic={name}>
                        <h1 className="header">{name}</h1>
                    </TopicLink>
                    <TopicDescription {...this.props}/>
                </div>
            </div>
        );
    }
}
