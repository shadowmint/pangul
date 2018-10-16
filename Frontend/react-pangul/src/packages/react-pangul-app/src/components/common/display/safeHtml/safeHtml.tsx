import * as React from "react";
import { Subject } from "rxjs";
import { debounceTime } from "rxjs/operators";
import * as sanitize from "sanitize-html";
import "./safeHtml.css";

export interface ISafeHtml {
    value: string;
    styles: string;
}

/**
 * Note that we deliberately strip H1 and H2 out of the possible content to stop people
 * spamming random stuff into topics. The topic is H1, the answer title is H2.
 * Anything else is beyond that.
 */
export class SafeHtml extends React.Component<ISafeHtml> {
    private static safe(value: string) {
        return (sanitize as any)(value, {
            allowProtocolRelative: true,
            allowedAttributes: {
                a: ["href", "name", "target"],
                img: ["src"],
            },
            allowedIframeHostnames: [],
            allowedTags: [
                "h3", "h4", "h5", "h6", "blockquote", "p", "a", "ul", "ol",
                "nl", "li", "b", "i", "strong", "em", "strike", "code", "hr", "br", "div",
                "table", "thead", "caption", "tbody", "tr", "th", "td", "pre", "iframe", "img"],

            allowedSchemes: ["http", "https"],
            allowedSchemesAppliedToAttributes: ["href", "src", "cite"],
            allowedSchemesByTag: {},
            selfClosing: ["img", "br", "hr", "area", "base", "basefont", "input", "link", "meta"],
        }) as string;
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
        this.withDoc((frame, doc) => {
            const innerContent = doc.getElementById("content");
            if (innerContent == null) {
                doc.open();
                doc.write(`<style>${this.props.styles}</style>`);
                doc.write(`<div id='content'>${output}</div>`);
                doc.close();
            } else {
                innerContent.innerHTML = output;
            }
        }, () => {
            this.withDoc((frame, doc) => {
                frame.style.height = `${doc.body.scrollHeight}px`;
            });
        });
    }

    private withDoc(action: (frame: HTMLIFrameElement, doc: Document) => void, then: (() => void) | null = null) {
        setTimeout(() => {
            if (this.frameRef.current != null) {
                const doc = this.frameRef.current.contentDocument;
                if (doc != null) {
                    action(this.frameRef.current, doc);
                    if (then) {
                        then();
                    }
                }
            }
        }, 1);
    }

}
