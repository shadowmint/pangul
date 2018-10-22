import * as React from "react";
import {QuestionSummary} from "../../../../../react-pangul-core/src/domain/questionSummary";
import {SafeMarkdown} from "../../common/display/safeMarkdown/safeMarkdown";
import {VotesAndStarsReadonly} from "../../metadata/votesAndStarsReadonly/votesAndStarsReadonly";
import {TagList} from "../../tag/tagList/tagList";
import {QuestionLink, QuestionLinkType} from "../questionLink/questionLink";
import "./questionSummaryView.css";

export interface IQuestionSummaryView {
    question: QuestionSummary;
}

export class QuestionSummaryView extends React.Component<IQuestionSummaryView> {
    public render() {
        const meta = this.props.question.state.meta;
        return (
            <div className="component--QuestionSummaryView">
                <div className="metadata">
                    <VotesAndStarsReadonly
                        userStars={meta.state.star ? 1 : 0}
                        userVotes={meta.state.votes}
                        votes={meta.state.global.votes}/>
                </div>
                <div className="output">
                    <QuestionLink question={this.props.question} target={QuestionLinkType.View}>
                        <h2>{this.props.question.state.title}</h2>
                    </QuestionLink>
                    <TagList tags={this.props.question.state.tags}/>
                    <SafeMarkdown markdown={this.props.question.state.summary}/>
                </div>
            </div>
        );
    }
}
