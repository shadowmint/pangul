import * as React from "react";
import { Question } from "../../../../../react-pangul-core/src/domain/question";
import { SafeMarkdown } from "../../common/display/safeMarkdown/safeMarkdown";
import { TagList } from "../../tag/tagList/tagList";
import "./questionView.css";

export interface IQuestionView {
    question: Question;
}

export class QuestionView extends React.Component<IQuestionView> {
    public render() {
        return (
            <div className="component--QuestionView">
                <h2>{this.props.question.state.title}</h2>
                <TagList tags={this.props.question.state.tags}/>
                <SafeMarkdown markdown={this.props.question.state.body}/>
            </div>
        );
    }
}
