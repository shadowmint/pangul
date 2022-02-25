import * as React from "react";
import "./errorNotice.css";

export interface IErrorLike {
    message: string;
    innerErrors?: { [key: string]: string };
}

export interface IErrorNotice {
    error: IErrorLike | null;
}

export class ErrorNotice extends React.Component<IErrorNotice> {
    private readonly innerRef: React.RefObject<HTMLDivElement>;

    constructor(props: IErrorNotice) {
        super(props);
        this.innerRef = React.createRef<HTMLDivElement>();
    }

    public render() {
        if (!this.props.error) {
            return (<React.Fragment/>);
        }

        this.scrollAsync();
        return (
            <div className="component--ErrorNotice" ref={this.innerRef}>
                <em>{this.props.error.message}</em>
                {this.renderInnerErrors()}
            </div>
        );
    }

    private renderInnerErrors() {
        if (this.props.error == null || !this.props.error.innerErrors) {
            return "";
        }
        const inner = [];
        for (const kv of Object.entries(this.props.error.innerErrors)) {
            inner.push(<li key={kv[0]}>{kv[0]}: {kv[1]}</li>);
        }
        return (
            <ul>
                {inner}
            </ul>
        );
    }

    private scrollAsync() {
        // Skip this, it never really worked.
    }
}
