import * as React from "react";

export interface ILayoutIf {
    show: boolean | string;
}

export class LayoutIf extends React.PureComponent<ILayoutIf> {
    public render() {
        if (!this.props.show) {
            return <React.Fragment/>;
        }
        return (
            <React.Fragment>
                {this.props.children}
            </React.Fragment>
        );
    }
}
