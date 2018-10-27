import * as React from "react";
import "./layoutRightBottom.css";

export class LayoutRightBottom extends React.PureComponent {
    public render() {
        return (
            <div className="component--LayoutRightBottom">
                {this.props.children}
            </div>
        );
    }
}