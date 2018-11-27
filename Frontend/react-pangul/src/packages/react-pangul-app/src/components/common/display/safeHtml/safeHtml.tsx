import * as React from "react";
import * as sanitize from "sanitize-html";
import "./safeHtml.css";

export interface ISafeHtml {
    value: string;
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

    public constructor(props: ISafeHtml) {
        super(props);
    }

    public render() {
        const output = SafeHtml.safe(this.props.value);
        return (
            <div className="component--SafeHtml" dangerouslySetInnerHTML={{__html: output}}/>
        );
    }


}
