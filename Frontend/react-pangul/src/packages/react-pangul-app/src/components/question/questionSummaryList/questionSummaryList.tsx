import * as React from "react";
import {QuerySet} from "../../../../../react-pangul-core/src/domain/querySet";
import {QuestionSummary} from "../../../../../react-pangul-core/src/domain/questionSummary";
import {LayoutContentContainer} from "../../layout/layoutContentContainer/layoutContentContainer";
import {QuestionSummaryView} from "../questionSummaryView/questionSummaryView";
import "./questionSummaryList.css";

export interface QuestionSummaryListProps {
    questions: QuerySet<QuestionSummary>;
    showEmpty: boolean;
}

export interface QuestionSummaryListState {
    pageSize: number;
    page: number;
}

export class QuestionSummaryList extends React.Component<QuestionSummaryListProps, QuestionSummaryListState> {
    constructor(props: QuestionSummaryListProps) {
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
        if (this.props.questions.state.instances === null || this.props.questions.state.instances.length === 0) {
            if (!this.props.showEmpty) {
                return <></>;
            }
            return (
                <LayoutContentContainer>
                    No questions found
                </LayoutContentContainer>
            );
        }
        return this.props.questions.state.instances.map((question) => {
            if (!question.state.questionId) {
                return (<React.Fragment/>);
            }
            return (
                <LayoutContentContainer key={question.state.questionId}>
                    <QuestionSummaryView question={question}/>
                </LayoutContentContainer>
            );
        });
    }
}
