import * as React from "react";
import {InputEditor} from "../../../components/common/editors/inputEditor/inputEditor";
import {LayoutStandardHeader} from "../../../components/layout/layoutStandardHeader/layoutStandardHeader";
import {QuestionSummaryList} from "../../../components/question/questionSummaryList/questionSummaryList";
import {ITopicViewQuestionProps, TopicSearch} from "./topicSearch";
import {LayoutFormContainer} from "../../../components/layout/layoutFormContainer/layoutFormContainer";

export class TopicSearchPage extends React.Component<ITopicViewQuestionProps> {
    private data: TopicSearch;
    private onSearchEvent: (value: string) => void;

    constructor(props: ITopicViewQuestionProps) {
        super(props);
        this.data = new TopicSearch(() => this.forceUpdate());
        this.onSearchEvent = (value: string) => this.onSearch(value);
    }

    public componentDidMount() {
        this.data.unload();
        this.data = new TopicSearch(() => this.forceUpdate());
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
        const search = this.data.state.search;
        const topic = this.data.state.topic;

        return (
            <div className={"component--TopicSearchPage"}>
                <LayoutStandardHeader user={this.props.user.state}
                                      topic={topic.state}
                                      loading={this.data.updating}/>
                <LayoutFormContainer error={this.data.error}>
                    <form>
                        <fieldset>
                            <InputEditor value={search} onChange={this.onSearchEvent}/>
                        </fieldset>
                    </form>
                </LayoutFormContainer>
                <QuestionSummaryList topic={topic} questions={questions}/>
            </div>
        );
    }

    public guardInvalidState(): boolean {
        return this.data !== null;
    }

    private onSearch(value: string) {
        this.data.search(value);
    }
}
