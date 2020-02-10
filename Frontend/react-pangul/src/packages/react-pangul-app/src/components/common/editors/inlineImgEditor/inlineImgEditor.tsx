import * as React from "react";
import "./inlineImgEditor.css";

export interface IInlineImgEditor {
    value: string | null;
    onChange: (body: string) => void;
}

export interface IInlineImgEditorState {
    value: string;
    loaded: number;
    total: number;
    loading: boolean;
    lastPropValue: string;
}

const RenderImg = (props: IInlineImgEditor) => {
    if (!props.value) {
        return (<React.Fragment/>);
    }
    return (
        <img src={props.value}/>
    );
};

export class InlineImgEditor extends React.Component<IInlineImgEditor, IInlineImgEditorState> {
    public static getDerivedStateFromProps(props: IInlineImgEditor, state: IInlineImgEditorState) {
        if (props.value !== state.lastPropValue) {
            return {value: props.value, lastPropValue: props.value};
        }
        return null;
    }

    constructor(props: IInlineImgEditor) {
        super(props);
        this.state = {
            lastPropValue: "",
            loaded: 0,
            loading: false,
            total: 0,
            value: "",
        };
    }

    public render() {
        return (
            <div className="component--InlineImgEditor">
                <div className="preview">
                    <RenderImg {...this.props}/>
                </div>
                {!this.state.loading ? <React.Fragment/> : (
                    <div className="progress">
                        {this.state.loaded} / {this.state.total}
                    </div>
                )}
                <input type="file" onChange={this.onChangeEvent}/>
            </div>
        );
    }

    private onChangeEvent = (e: React.FormEvent<HTMLInputElement>) => this.onChange(e);

    /**
     * Prevent react from jumping the cursor as you type
     */
    private onChange(event: React.FormEvent<HTMLInputElement>) {
        if (event.currentTarget.files && event.currentTarget.files.length > 0) {
            const file = event.currentTarget.files [0];
            const reader = new FileReader();
            this.setState({loading: true}, () => {
                reader.onloadend = (ev: ProgressEvent) => {
                    const value = reader.result as string;
                    this.setState({
                        loaded: ev.loaded,
                        loading: false,
                        total: ev.total,
                        value,
                    }, () => {
                        this.props.onChange(value);
                    });
                };
                reader.onprogress = (ev: ProgressEvent) => {
                    this.setState({
                        loaded: ev.loaded,
                        total: ev.total,
                    });
                };
                reader.readAsDataURL(file);
            });
        }
    }
}
