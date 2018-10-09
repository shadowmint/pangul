import React, {Component} from "react";
import {TopicHome} from "./topicHome";

export interface ITopicHomePageProps {
    topic: string;
}

export interface ITopicHomePageState {
    page: TopicHome;
}

export class TopicHomePage extends Component<ITopicHomePageProps, ITopicHomePageState> {
    constructor(props: ITopicHomePageProps) {
        super(props);
        this.state = {
            page: new TopicHome(),
        };
    }

    public render() {
        return (
            <div className={"component--TopicHomePage"}>
                topic:{this.state.page.state.topic}
            </div>
        );
    }
}