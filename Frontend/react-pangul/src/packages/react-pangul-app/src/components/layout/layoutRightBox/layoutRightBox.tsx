import * as React from "react";
import "./layoutRightBox.css";

export interface ILayoutRightBox {
    expand: boolean;
}

export class LayoutRightBox extends React.PureComponent<ILayoutRightBox> {
    public render() {
        const position = this.props.expand ? "static" : "absolute";
        return (
            <div className="component--LayoutRightBox" style={{position}}>
                {this.props.children}
            </div>
        );
    }
}