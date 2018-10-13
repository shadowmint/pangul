import * as React from "react";
import "./errorNotice.css";

export interface IErrorNotice {
    error: Error | null;
}

export class ErrorNotice extends React.Component<IErrorNotice> {
    public render() {
        if (!this.props.error) {
            return (<React.Fragment/>);
        }
        return (
            <div className="component--ErrorContainer">
                {this.props.error.message}
            </div>
        );
    }
}
