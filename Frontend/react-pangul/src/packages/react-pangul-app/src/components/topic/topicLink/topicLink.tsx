import * as React from "react";
import NavigationService from "../../../infrastructure/service/navigationService";
import "./topicLink.css";

export enum TopicLinkType {
    View,
    Edit,
}

export interface ITopicLink {
    target: TopicLinkType;
    topic: string;
}

export class TopicLink extends React.Component<ITopicLink> {
    private nav: NavigationService;

    public constructor(props: ITopicLink) {
        super(props);
        this.nav = new NavigationService();
    }

    public render() {
        if (!this.props.topic) {
            return (<React.Fragment/>);
        }
        const linkUrl = this.getUrl();
        return (
            <div className="component--TopicLink">
                <a href={linkUrl}>{this.props.children}</a>
            </div>
        );
    }

    private getUrl(): string {
        switch (this.props.target) {
            case TopicLinkType.View:
                return this.nav.urlForTopic(this.props.topic);
            case TopicLinkType.Edit:
                return this.nav.urlForTopicEdit(this.props.topic);
            default:
                throw new Error("Unsupported target");
        }
    }
}
