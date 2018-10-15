import * as React from "react";
import { Answer } from "../../../../../react-pangul-core/src/domain/answer";
import { Question } from "../../../../../react-pangul-core/src/domain/question";
import NavigationService from "../../../infrastructure/service/navigationService";
import "./answerLink.css";

export enum AnswerLinkType {
    Edit,
}

export interface IAnswerLink {
    question: Question;
    answer: Answer;
    target: AnswerLinkType;
    topic: string;
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
        const text = this.getLinkText();
        return (
            <div className="component--AnswerLink">
                <a href={linkUrl}>{text}</a>
            </div>
        );
    }

    private getUrl(): string {
        switch (this.props.target) {
            case AnswerLinkType.Edit:
                return this.nav.urlForAnswerEdit(
                    this.props.topic,
                    this.props.question.state.questionId,
                    this.props.answer.state.answerId);
            default:
                throw new Error("Unsupported target");
        }
    }

    private getLinkText(): string {
        switch (this.props.target) {
            case AnswerLinkType.Edit:
                return "edit";
            default:
                throw new Error("Unsupported target");
        }
    }
}
