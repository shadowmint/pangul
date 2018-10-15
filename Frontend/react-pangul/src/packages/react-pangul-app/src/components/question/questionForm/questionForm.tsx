import * as React from "react";
import { Question } from "../../../../../react-pangul-core/src/domain/question";
import { InputEditor } from "../../common/editors/inputEditor/inputEditor";
import { MarkdownEditor } from "../../common/editors/markdownEditor/markdownEditor";
import { TagPicker } from "../../tag/tagPicker/tagPicker";

export interface IQuestionForm {
    submit: () => void;
    question: Question;
    saveText: string;
}

export class QuestionForm extends React.Component<IQuestionForm> {
    private onSaveEvent: (e: React.FormEvent) => void;
    private onTitleChangedEvent: (title: string) => void;
    private onTagsChangedEvent: (tags: string[]) => void;
    private onBodyChangedEvent: (body: string) => void;

    public constructor(props: IQuestionForm) {
        super(props);
        this.onBodyChangedEvent = (body: string) => this.onBodyChanged(body);
        this.onSaveEvent = (e: React.FormEvent) => this.onSave(e);
        this.onTagsChangedEvent = (tags: string[]) => this.onTagsChanged(tags);
        this.onTitleChangedEvent = (value: string) => this.onTitleChanged(value);
    }

    public render() {
        return (
            <div className="component--Question">
                <form action="" onSubmit={this.onSaveEvent}>
                    <fieldset>
                        <input disabled={true} value={this.props.question.state.topic}/>
                    </fieldset>
                    <fieldset>
                        <InputEditor value={this.props.question.state.title} onChange={this.onTitleChangedEvent}/>
                    </fieldset>
                    <fieldset>
                        <TagPicker value={this.props.question.state.tags} onChange={this.onTagsChangedEvent}/>
                    </fieldset>
                    <fieldset>
                        <MarkdownEditor value={this.props.question.state.body} onChange={this.onBodyChangedEvent}/>
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
