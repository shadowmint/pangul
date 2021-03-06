import * as React from "react";
import { SafeMarkdown } from "../../display/safeMarkdown/safeMarkdown";
import "./markdownEditor.css";

export interface IMarkdownEditor {
    value: string;
    onChange: (body: string) => void;
}

export interface IMarkdownEditorState {
    value: string;
    lastPropValue: string;
}

export class MarkdownEditor extends React.Component<IMarkdownEditor, IMarkdownEditorState> {
    public static getDerivedStateFromProps(props: IMarkdownEditor, state: IMarkdownEditorState) {
        if (props.value !== state.lastPropValue) {
            return {value: props.value, lastPropValue: props.value};
        }
        return null;
    }

    private events: { [key: string]: any } = {};

    constructor(props: IMarkdownEditor) {
        super(props);

        this.state = {
            lastPropValue: "",
            value: "",
        };
        this.events = {
            onChange: (e: React.FormEvent<HTMLTextAreaElement>) => this.onChange(e),
        };
    }

    public render() {
        return (
            <div className="component--MarkdownEditor">
                <textarea value={this.state.value} onChange={this.events.onChange}/>
                <div className="rendered">
                    <SafeMarkdown markdown={this.state.value}/>
                </div>
            </div>
        );
    }

    /**
     * Prevent react from jumping the cursor as you type
     */
    private onChange(event: React.FormEvent<HTMLTextAreaElement>) {
        const value = event.currentTarget.value;
        this.setState({value}, () => {
            this.props.onChange(value);
        });
    }
}
