import * as React from "react";
import {LayoutStandardHeader} from "../../../components/layout/layoutStandardHeader/layoutStandardHeader";
import {QuestionSummaryList} from "../../../components/question/questionSummaryList/questionSummaryList";
import {ITopicViewQuestionProps, TopicHome} from "./topicHome";

export class TopicHomePage extends React.Component<ITopicViewQuestionProps> {
    private data: TopicHome;

    constructor(props: ITopicViewQuestionProps) {
        super(props);
        this.data = new TopicHome(() => this.forceUpdate());
    }

    public componentDidMount() {
        this.data.unload();
        this.data = new TopicHome(() => this.forceUpdate());
        this.data.load(this.props);
    }

    public componentWillUnmount() {
        this.data.unload();
    }

    public render() {
        if (!this.guardInvalidState()) {
            return (<React.Fragment/>);
        }

        const questions = this.data.state.questions;
        const topic = this.data.state.topic;

        return (
            <div className={"component--TopicHomePage"}>
                <LayoutStandardHeader user={this.props.user.state}
                                      topic={topic.state}
                                      loading={this.data.updating}/>
                <QuestionSummaryList topic={topic} questions={questions}/>
            </div>
        );
    }

    public guardInvalidState(): boolean {
        return this.data !== null;
    }
}
