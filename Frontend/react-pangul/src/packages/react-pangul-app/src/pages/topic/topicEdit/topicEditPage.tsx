import * as React from "react";
import { InfoNotice } from "../../../components/common/display/infoNotice/infoNotice";
import { LayoutFormContainer } from "../../../components/layout/layoutFormContainer/layoutFormContainer";
import { LayoutStandardHeader } from "../../../components/layout/layoutStandardHeader/layoutStandardHeader";
import { TopicForm } from "../../../components/topic/topicForm/topicForm";
import { ITopicEditProps, TopicEdit } from "./topicEdit";

export class TopicEditPage extends React.Component<ITopicEditProps> {
    private data: TopicEdit;

    constructor(props: ITopicEditProps) {
        super(props);
        this.data = new TopicEdit(() => this.forceUpdate());
    }

    public componentDidMount() {
        this.data.unload();
        this.data = new TopicEdit(() => this.forceUpdate());
        this.data.load(this.props);
    }

    public componentWillUnmount() {
        this.data.unload();
    }

    public render() {
        if (!this.guardInvalidState()) {
            return <React.Fragment/>;
        }

        const topic = this.data.state.topic;

        return (
            <div className={"component--TopicHomePage"}>
                <LayoutStandardHeader user={this.props.user.state}
                                      topic={topic.state}
                                      loading={this.data.updating}/>
                <LayoutFormContainer error={this.data.state.topic.error}>
                    <InfoNotice value={this.data.state.notice}/>
                    <TopicForm submit={this.onSubmitFormEvent} topic={topic} saveText="Save"/>
                </LayoutFormContainer>
            </div>
        );
    }

    public guardInvalidState(): boolean {
        return this.data !== null;
    }

    private onSubmitFormEvent = async () => await this.data.saveTopic();
}
