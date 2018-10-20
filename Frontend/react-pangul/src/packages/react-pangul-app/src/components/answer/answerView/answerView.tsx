import * as React from "react";
import {Answer} from "../../../../../react-pangul-core/src/domain/answer";
import {Question} from "../../../../../react-pangul-core/src/domain/question";
import {Topic} from "../../../../../react-pangul-core/src/domain/topic";
import {SafeMarkdown} from "../../common/display/safeMarkdown/safeMarkdown";
import {LayoutRightBox} from "../../layout/layoutRightBox/layoutRightBox";
import {AnswerLink, AnswerLinkType} from "../answerLink/answerLink";
import "./answerView.css";

export interface IAnswerView {
    answer: Answer;
    question: Question;
    topic: Topic;
}

export class AnswerView extends React.Component<IAnswerView> {
    public render() {
        return (
            <div className="component--AnswerView">
                <LayoutRightBox expand={false}>
                    <AnswerLink question={this.props.question} answer={this.props.answer} target={AnswerLinkType.Edit}>
                        Edit
                    </AnswerLink>
                </LayoutRightBox>
                <div className="output">
                    <SafeMarkdown markdown={this.props.answer.state.body}/>
                </div>
            </div>
        );
    }
}
