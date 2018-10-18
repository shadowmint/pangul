import * as React from "react";
import {InputEditor} from "../../../components/common/editors/inputEditor/inputEditor";
import {LayoutFormContainer} from "../../../components/layout/layoutFormContainer/layoutFormContainer";
import {LayoutStandardHeader} from "../../../components/layout/layoutStandardHeader/layoutStandardHeader";
import {QuestionSummaryList} from "../../../components/question/questionSummaryList/questionSummaryList";
import {ITopicViewQuestionProps, TopicSearch} from "./topicSearch";
import {LayoutRightBox} from "../../../components/layout/layoutRightBox/layoutRightBox";
import {TopicLink, TopicLinkType} from "../../../components/topic/topicLink/topicLink";
import {LayoutContentContainer} from "../../../components/layout/layoutContentContainer/layoutContentContainer";

export class TopicSearchPage extends React.Component<ITopicViewQuestionProps> {
    private data: TopicSearch;

    constructor(props: ITopicViewQuestionProps) {
        super(props);
        this.data = new TopicSearch(() => this.forceUpdate());
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

                <LayoutContentContainer>
                    <LayoutRightBox expand={true}>
                        <TopicLink target={TopicLinkType.AddQuestion} topic={this.props.topic}>
                            <button>Ask question</button>
                        </TopicLink>
                    </LayoutRightBox>
                </LayoutContentContainer>

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

    private onSearchEvent = (value: string) => this.onSearch(value);

    private onSearch(value: string) {
        this.data.search(value);
    }
}
