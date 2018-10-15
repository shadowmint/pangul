import * as React from "react";
import {QuestionSummary} from "../../../../../react-pangul-core/src/domain/questionSummary";
import {Topic} from "../../../../../react-pangul-core/src/domain/topic";
import {SafeMarkdown} from "../../common/display/safeMarkdown/safeMarkdown";
import {TagList} from "../../tag/tagList/tagList";
import {QuestionLink, QuestionLinkType} from "../questionLink/questionLink";
import "./questionSummaryView.css";

export interface IQuestionSummaryView {
    question: QuestionSummary;
    topic: Topic;
}

export class QuestionSummaryView extends React.Component<IQuestionSummaryView> {
    public render() {
        const topidName = this.props.topic.state.name;
        return (
            <div className="component--QuestionSummaryView">
                <QuestionLink topic={topidName} question={this.props.question} target={QuestionLinkType.View}/>
                <h2>{this.props.question.state.title}</h2>
                <TagList tags={this.props.question.state.tags}/>
                <SafeMarkdown markdown={this.props.question.state.summary}/>
            </div>
        );
    }
}
