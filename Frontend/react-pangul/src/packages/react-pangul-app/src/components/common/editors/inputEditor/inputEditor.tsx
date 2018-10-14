import * as React from "react";

export interface IInputEditor {
    value: string;
    onChange: (body: string) => void;
}

export interface IInputEditorState {
    value: string;
    lastPropValue: string;
}

export class InputEditor extends React.Component<IInputEditor, IInputEditorState> {
    public static getDerivedStateFromProps(props: IInputEditor, state: IInputEditorState) {
        if (props.value !== state.lastPropValue) {
            return {value: props.value, lastPropValue: props.value};
        }
        return null;
    }

    private events: { [key: string]: any } = {};

    constructor(props: IInputEditor) {
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
            <input value={this.state.value} onChange={this.events.onChange}/>
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
