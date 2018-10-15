import * as React from "react";
import "./layoutFormContainer.css";

export class LayoutContentContainer extends React.PureComponent {
    public render() {
        return (
            <div className="component--LayoutContentContainer">
                {this.props.children}
            </div>
        );
    }
}