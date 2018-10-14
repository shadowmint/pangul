import * as React from "react";
import {Question} from "../../../../../react-pangul-core/src/domain/question";
import "./questionLink.css";
import NavigationService from "../../../infrastructure/service/navigationService";

export interface IQuestionLink {
    question: Question;
    topic: string;
}

export class QuestionLink extends React.Component<IQuestionLink> {
    private nav: NavigationService;

    public constructor(props: IQuestionLink) {
        super(props);
        this.nav = new NavigationService();
    }

    public render() {
        if (!this.props.question.state.questionId) {
            return (<React.Fragment/>);
        }
        const linkUrl = this.nav.urlForQuestion(this.props.topic, this.props.question.state.questionId);
        return (
            <div className="component--QuestionLink">
                <a href={linkUrl}>open question</a>
            </div>
        );
    }
}
