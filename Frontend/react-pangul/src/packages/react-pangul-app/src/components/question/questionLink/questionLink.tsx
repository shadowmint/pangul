import * as React from "react";
import {Question} from "../../../../../react-pangul-core/src/domain/question";
import {QuestionSummary} from "../../../../../react-pangul-core/src/domain/questionSummary";
import NavigationService from "../../../infrastructure/service/navigationService";
import "./questionLink.css";

export enum QuestionLinkType {
    View,
    Edit,
}

export interface IQuestionLink {
    question: Question | QuestionSummary;
    target: QuestionLinkType;
    topic: string;
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
        const text = this.getLinkText();
        return (
            <div className="component--QuestionLink">
                <a href={linkUrl}>{text}</a>
            </div>
        );
    }

    private getUrl(): string {
        switch (this.props.target) {
            case QuestionLinkType.View:
                return this.nav.urlForQuestion(this.props.topic, this.props.question.state.questionId);
            case QuestionLinkType.Edit:
                return this.nav.urlForQuestionEdit(this.props.topic, this.props.question.state.questionId);
            default:
                throw new Error("Unsupported target");
        }
    }

    private getLinkText(): string {
        switch (this.props.target) {
            case QuestionLinkType.View:
                return "view";
            case QuestionLinkType.Edit:
                return "edit";
            default:
                throw new Error("Unsupported target");
        }
    }
}
