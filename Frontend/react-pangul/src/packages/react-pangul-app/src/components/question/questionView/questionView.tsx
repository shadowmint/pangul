import * as React from "react";
import {Question} from "../../../../../react-pangul-core/src/domain/question";
import {SafeMarkdown} from "../../common/display/safeMarkdown/safeMarkdown";
import {LayoutRightBottom} from "../../layout/layoutRightBottom/layoutRightBottom";
import {VotesAndStars} from "../../metadata/votesAndStars/votesAndStars";
import {TagList} from "../../tag/tagList/tagList";
import {UserSummary} from "../../user/userSummary/userSummary";
import "./questionView.css";

export interface IQuestionView {
    question: Question;
}

export class QuestionView extends React.Component<IQuestionView> {
    public render() {
        const meta = this.props.question.state.meta;
        return (
            <div className="component--QuestionView">
                <div className="metadata">
                    <VotesAndStars showStars={true}
                                   userStars={meta.state.star ? 1 : 0}
                                   userVotes={meta.state.votes}
                                   votes={meta.state.global.votes}
                                   onVote={this.onVote}
                                   onStar={this.onStar}/>
                </div>
                <div className="output">
                    <h2>{this.props.question.state.title}</h2>
                    <TagList tags={this.props.question.state.tags}/>
                    <SafeMarkdown markdown={this.props.question.state.body}/>
                    <LayoutRightBottom>
                        <UserSummary user={this.props.question.state.user}/>
                    </LayoutRightBottom>
                </div>
            </div>
        );
    }

    private onVote = async (votes: number) => {
        if (votes > 0) {
            await this.props.question.state.meta.voteUp();
        } else if (votes < 0) {
            await this.props.question.state.meta.voteDown();
        } else {
            await this.props.question.state.meta.voteNeutral();
        }
    }

    private onStar = async (stars: number) => {
        if (stars) {
            await this.props.question.state.meta.addStar();
        } else {
            await this.props.question.state.meta.removeStar();
        }
    }
}
