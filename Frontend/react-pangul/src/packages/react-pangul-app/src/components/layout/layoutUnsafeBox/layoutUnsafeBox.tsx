import * as React from "react";
import "./layoutUnsafeBox.css";

export interface ILayoutUnsafeBox {
    title: string;
}

export interface ILayoutUnsafeBoxState {
    open: boolean;
}

export class LayoutUnsafeBox extends React.Component<ILayoutUnsafeBox, ILayoutUnsafeBoxState> {
    public constructor(props: ILayoutUnsafeBox) {
        super(props);
        this.state = {
            open: false,
        };
    }

    public render() {
        if (this.state.open) {
            return (
                <div className="component--LayoutUnsafeBox">
                    <div className="header" onClick={this.toggleOpenState}>
                        {this.props.title}
                    </div>
                    {this.props.children}
                </div>
            );
        }

        return (
            <div className="component--LayoutUnsafeBox">
                <div className="header" onClick={this.toggleOpenState}>
                    {this.props.title}
                </div>
            </div>
        );
    }

    private toggleOpenState = () => {
        this.setState({open: !this.state.open});
    }
}
