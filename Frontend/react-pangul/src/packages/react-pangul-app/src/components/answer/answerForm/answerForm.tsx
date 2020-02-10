import * as React from "react";
import { Answer } from "../../../../../react-pangul-core/src/domain/answer";
import {MarkdownEditor} from "../../common/editors/markdownEditor/markdownEditor";

export interface IAnswerForm {
    submit: () => Promise<void>;
    answer: Answer;
    saveText: string;
}

export interface IAnswerFormState {
    lastUpdate: Date;
}

export class AnswerForm extends React.Component<IAnswerForm> {
    private events: { [id: string]: (data: any) => void } = {};
    private unsubscribe: (() => void) | null = null;

    public constructor(props: IAnswerForm) {
        super(props);
        this.state = {
            lastUpdate: new Date(),
        };
        this.events = {
            onBodyChanged: (body: string) => this.onBodyChanged(body),
            onSave: (e: React.FormEvent) => this.onSave(e),
        };
    }

    public componentDidMount() {
        this.unsubscribe = this.props.answer.subscribe(() => {
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
            <div className="component--Answer">
                <form action="" onSubmit={this.events.onSave}>
                    <fieldset>
                        <MarkdownEditor value={this.props.answer.state.body} onChange={this.events.onBodyChanged}/>
                    </fieldset>
                    <fieldset className="buttons">
                        <button className="submit">{this.props.saveText}</button>
                    </fieldset>
                </form>
            </div>
        );
    }

    private onSave(e: React.FormEvent) {
        e.preventDefault();
        this.props.submit();
    }

    private onBodyChanged(body: string) {
        this.props.answer.update(async () => {
            return {body};
        });
    }
}
