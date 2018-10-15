import * as React from "react";
import {QuerySet} from "../../../../../react-pangul-core/src/domain/querySet";
import {QuestionSummary} from "../../../../../react-pangul-core/src/domain/questionSummary";
import {Topic} from "../../../../../react-pangul-core/src/domain/topic";
import {LayoutContentContainer} from "../../layout/layoutContentContainer/layoutContentContainer";
import {QuestionSummaryView} from "../questionSummaryView/questionSummaryView";
import "./questionSummaryList.css";

export interface IQuestionSummaryList {
    questions: QuerySet<QuestionSummary>;
    topic: Topic;
}

export interface IQuestionSummaryListState {
    pageSize: number;
    page: number;
}

export class QuestionSummaryList extends React.Component<IQuestionSummaryList, IQuestionSummaryListState> {
    constructor(props: IQuestionSummaryList) {
        super(props);
        this.state = {
            page: 0,
            pageSize: 10,
        };
    }

    public render() {
        return (
            <div className="component--QuestionSummaryList">
                {this.renderList()}
            </div>
        );
    }

    public renderList() {
        if (this.props.questions.state.instances == null) {
            return [];
        }
        return this.props.questions.state.instances.map((question) => {
            if (!question.state.questionId) {
                return (<React.Fragment/>);
            }
            return (
                <LayoutContentContainer key={question.state.questionId}>
                    <QuestionSummaryView question={question} topic={this.props.topic}/>
                </LayoutContentContainer>
            );
        });
    }
}
