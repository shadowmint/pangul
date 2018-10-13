import * as React from "react";
import { ITopic } from "../../../../../react-pangul-core/src/domain/topic";
import "./topicInfo.css";

export class TopicInfo extends React.Component<ITopic> {
    public render() {
        return (
            <div className="component--TopicInfo">
                <h1 className={"header"}>{this.props.name}</h1>
                <div className={"desc"}>{this.props.description || "no description"}</div>
            </div>
        );
    }
}
