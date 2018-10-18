import * as React from "react";
import "./layoutRightBox.css";

export interface ILayoutRightBox {
    expand: boolean;
}

export class LayoutRightBox extends React.PureComponent<ILayoutRightBox> {
    public render() {
        const height = this.props.expand ? "auto" : "1px";
        const padding = this.props.expand ? "0.3em 0.5em" : "0 0.5em";
        return (
            <div className="component--LayoutRightBox" style={{height, padding}}>
                {this.props.children}
            </div>
        );
    }
}