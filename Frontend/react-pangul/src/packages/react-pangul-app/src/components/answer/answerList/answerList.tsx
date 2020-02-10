import * as React from "react";
import {Answer} from "../../../../../react-pangul-core/src/domain/answer";
import {QuerySet} from "../../../../../react-pangul-core/src/domain/querySet";
import {Question} from "../../../../../react-pangul-core/src/domain/question";
import {Topic} from "../../../../../react-pangul-core/src/domain/topic";
import {LayoutContentContainer} from "../../layout/layoutContentContainer/layoutContentContainer";
import {AnswerView} from "../answerView/answerView";

export interface IAnswerList {
    answers: QuerySet<Answer>;
    topic: Topic;
    question: Question;
}

export interface IAnswerListState {
    pageSize: number;
    page: number;
}

export class AnswerList extends React.Component<IAnswerList> {
    public render() {
        return (
            <div className="component--AnswerList">
                {this.renderAnswerList()}
            </div>
        );
    }

    public renderAnswerList() {
        if (this.props.answers.state.instances == null) {
            return [];
        }
        return this.props.answers.state.instances.map((answer) => {
            return (
                <LayoutContentContainer key={answer.state.answerId}>
                    <AnswerView answer={answer}
                                question={this.props.question}
                                topic={this.props.topic}/>
                </LayoutContentContainer>
            );
        });
    }
}
