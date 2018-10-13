import * as React from "react";
import "./layoutTheme.css";

export class LayoutTheme extends React.Component {
    public render() {
        return (
            <div className="component--LayoutTheme">
                {this.props.children}
            </div>
        );
    }
}