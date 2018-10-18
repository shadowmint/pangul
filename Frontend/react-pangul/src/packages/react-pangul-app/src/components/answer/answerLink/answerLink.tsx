import * as React from "react";
import {Answer} from "../../../../../react-pangul-core/src/domain/answer";
import {Question} from "../../../../../react-pangul-core/src/domain/question";
import NavigationService from "../../../infrastructure/service/navigationService";
import "./answerLink.css";

export enum AnswerLinkType {
    Edit,
}

export interface IAnswerLink {
    question: Question;
    answer: Answer;
    target: AnswerLinkType;
}

export class AnswerLink extends React.Component<IAnswerLink> {
    private nav: NavigationService;

    public constructor(props: IAnswerLink) {
        super(props);
        this.nav = new NavigationService();
    }

    public render() {
        if (!this.props.question.state.questionId) {
            return (<React.Fragment/>);
        }
        const linkUrl = this.getUrl();
        return (
            <div className="component--AnswerLink">
                <a href={linkUrl}>{this.props.children}</a>
            </div>
        );
    }

    private getUrl(): string {
        switch (this.props.target) {
            case AnswerLinkType.Edit:
                return this.nav.urlForAnswerEdit(
                    this.props.question.state.topic,
                    this.props.question.state.questionId,
                    this.props.answer.state.answerId);
            default:
                throw new Error("Unsupported target");
        }
    }
}
