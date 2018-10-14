import * as React from "react";
import {Question} from "../../../../../react-pangul-core/src/domain/question";
import {InputEditor} from "../../common/editors/inputEditor/inputEditor";
import {MarkdownEditor} from "../../common/editors/markdownEditor/markdownEditor";
import {TagPicker} from "../../tag/tagPicker/tagPicker";

export interface IQuestionForm {
    submit: () => void;
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
            onBodyChanged: (body: string) => this.onBodyChanged(body),
            onSave: (e: React.FormEvent) => this.onSave(e),
            onTagsChanged: (tags) => this.onTagsChanged(tags),
            onTitleChanged: (value) => this.onTitleChanged(value),
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
                <form action="" onSubmit={this.events.onSave}>
                    <fieldset>
                        <input disabled={true} value={this.props.question.state.topic}/>
                    </fieldset>
                    <fieldset>
                        <InputEditor value={this.props.question.state.title} onChange={this.events.onTitleChanged}/>
                    </fieldset>
                    <fieldset>
                        <TagPicker value={this.props.question.state.tags} onChange={this.events.onTagsChanged}/>
                    </fieldset>
                    <fieldset>
                        <MarkdownEditor value={this.props.question.state.body} onChange={this.events.onBodyChanged}/>
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

    private onTitleChanged(title: string) {
        this.props.question.update(async () => {
            return {title};
        });
    }

    private onTagsChanged(tags: string[]) {
        this.props.question.update(async () => {
            return {tags};
        });
    }

    private onBodyChanged(body: string) {
        this.props.question.update(async () => {
            return {body};
        });
    }
}
