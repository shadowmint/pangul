import * as React from "react";
import {Link} from "react-router-dom";
import {Question} from "../../../../../react-pangul-core/src/domain/question";
import {QuestionSummary} from "../../../../../react-pangul-core/src/domain/questionSummary";
import NavigationService from "../../../infrastructure/service/navigationService";
import "./questionLink.css";

export enum QuestionLinkType {
    Answer,
    View,
    Edit,
}

export interface IQuestionLink {
    question: Question | QuestionSummary;
    target: QuestionLinkType;
}

export class QuestionLink extends React.Component<IQuestionLink> {
    private nav: NavigationService;

    public constructor(props: IQuestionLink) {
        super(props);
        this.nav = new NavigationService();
    }

    public render() {
        if (!this.props.question) {
            return (<React.Fragment/>);
        }
        const linkUrl = this.getUrl();

        return (
            <Link to={linkUrl}>{this.props.children}</Link>
        );
    }

    private getUrl(): string {
        const topicName = this.props.question.state.topic;
        const questionId = this.props.question.state.questionId;
        switch (this.props.target) {
            case QuestionLinkType.View:
                return this.nav.urlForQuestion(topicName, questionId);
            case QuestionLinkType.Edit:
                return this.nav.urlForQuestionEdit(topicName, questionId);
            case QuestionLinkType.Answer:
                return this.nav.urlForQuestionAnswer(topicName, questionId);
            default:
                throw new Error("Unsupported target");
        }
    }
}
