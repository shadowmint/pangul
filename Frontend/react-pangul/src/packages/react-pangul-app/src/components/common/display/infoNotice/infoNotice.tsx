import * as React from "react";
import * as ReactDOM from "react-dom";
import "./infoNotice.css";

export interface IInfoNotice {
    value: string | null;
}

export class InfoNotice extends React.Component<IInfoNotice> {
    private readonly innerRef: React.RefObject<HTMLDivElement>;

    constructor(props: IInfoNotice) {
        super(props);
        this.innerRef = React.createRef<HTMLDivElement>();
    }

    public render() {
        if (!this.props.value) {
            return (<React.Fragment/>);
        }

        this.scrollAsync();
        return (
            <div className="component--InfoNotice" ref={this.innerRef}>
                {this.props.value}
            </div>
        );
    }

    private scrollAsync() {
        setTimeout(() => {
            if (this.innerRef.current != null) {
                const errorRef = ReactDOM.findDOMNode(this.innerRef.current);
                (errorRef as Element).scrollIntoView({block: "end", behavior: "smooth"});
            }
        }, 1);
    }
}
