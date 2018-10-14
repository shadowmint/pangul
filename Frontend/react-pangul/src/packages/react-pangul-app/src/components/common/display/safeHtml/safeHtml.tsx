import * as React from "react";
import {Subject} from "rxjs";
import {debounceTime} from "rxjs/operators";
import "./safeHtml.css";

export interface ISafeHtml {
    value: string;
    styles: string;
}

export class SafeHtml extends React.Component<ISafeHtml> {
    private static safe(value: string) {
        return value;
    }

    private updateStream: Subject<any>;

    private frameRef: React.RefObject<HTMLIFrameElement>;

    public constructor(props: ISafeHtml) {
        super(props);
        this.frameRef = React.createRef();
        this.updateStream = new Subject();
        this.updateStream.pipe(debounceTime(100)).subscribe(() => this.renderContentAsync());
    }

    public render() {
        this.updateStream.next();
        return (
            <div className="component--SafeHtml">
                <iframe ref={this.frameRef}/>
            </div>
        );
    }

    private renderContentAsync() {
        const output = SafeHtml.safe(this.props.value);
        if (this.frameRef.current != null) {
            const doc = this.frameRef.current.contentDocument;
            if (doc != null) {
                doc.open();
                doc.write(`<style>${this.props.styles}</style>`);
                doc.write(output);
                doc.close();
            }
        }
    }
}
