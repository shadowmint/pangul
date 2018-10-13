import * as React from "react";
import {IQuestion, Question} from "../../../../../../react-pangul-core/src/domain/question";

export interface IQuestionForm {
    submit: (state: IQuestion) => Promise<boolean>;
    question: Question;
    saveText: string;
}

export interface IQuestionFormState {
    lastUpdate: Date;
}

export class QuestionForm extends React.Component<IQuestionForm> {
    private events: { [id: string]: (data: any) => void } = {};
    private unsubscribe: (() => void) | null = null;

    public constructor(props: IQuestionForm) {
        super(props);
        this.state = {
            lastUpdate: new Date(),
        };
        this.events = {
            onTitleChanged: (event) => this.onTitleChanged(event),
        };
    }

    public componentDidMount() {
        this.unsubscribe = this.props.question.subscribe(() => {
            this.setState({
                lastUpdate: new Date(),
            });
        });
    }

    public componentWillUnmount() {
        if (this.unsubscribe) {
            this.unsubscribe();
            this.unsubscribe = null;
        }
    }

    public render() {
        return (
            <div className="component--Question">
                (topic: {this.props.question.state.topic})
                <input value={this.props.question.state.title} onChange={this.events.onTitleChanged}/>
                <button className="submit">{this.props.saveText}</button>
            </div>
        );
    }

    private onTitleChanged(event: React.FormEvent<HTMLInputElement>) {
        this.props.question.update(async () => {
            return {title: event.currentTarget.value};
        });
    }
}
