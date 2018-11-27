import * as React from "react";
import {QuerySetPaginator} from "../../../components/common/fragments/querySetPaginator/querySetPaginator";
import {SearchBar} from "../../../components/common/fragments/searchBar/searchBar";
import {LayoutContentContainer} from "../../../components/layout/layoutContentContainer/layoutContentContainer";
import {LayoutRightBox} from "../../../components/layout/layoutRightBox/layoutRightBox";
import {LayoutStandardHeader} from "../../../components/layout/layoutStandardHeader/layoutStandardHeader";
import {QuestionSummaryList} from "../../../components/question/questionSummaryList/questionSummaryList";
import {TopicLink, TopicLinkType} from "../../../components/topic/topicLink/topicLink";
import {ITopicViewQuestionProps, TopicSearch} from "./topicSearch";

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

                <SearchBar error={this.data.error}
                           value={search}
                           onChange={this.onSearchEvent}/>

                <QuestionSummaryList questions={questions}/>

                <QuerySetPaginator allowedSizes={[1, 5, 10, 25]}
                                   queryState={questions.state}
                                   onChangeSize={this.onChangeSize}
                                   onNext={this.onNext}
                                   onPrev={this.onPrev}
                                   error={questions.error}/>

                <LayoutContentContainer>
                    <LayoutRightBox expand={true}>
                        <TopicLink target={TopicLinkType.AddQuestion} topic={this.props.topic}>
                            <button>Ask question</button>
                        </TopicLink>
                    </LayoutRightBox>
                </LayoutContentContainer>
            </div>
        );
    }

    public guardInvalidState(): boolean {
        return this.data !== null;
    }

    private onSearchEvent = (value: string) => this.data.search(value);

    private onChangeSize = (size: number) => this.data.setPageSize(size);

    private onNext = () => this.data.next();

    private onPrev = () => this.data.prev();
}
