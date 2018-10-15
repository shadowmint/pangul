import * as React from "react";
import * as Showdown from "showdown";
import ThemeCss from "../../../layout/layoutTheme/layoutThemeCss";
import { ErrorNotice } from "../../errors/errorNotice/errorNotice";
import { SafeHtml } from "../safeHtml/safeHtml";

export interface ISafeMarkdown {
    markdown: string;
}

export class SafeMarkdown extends React.PureComponent<ISafeMarkdown> {
    private converter: Showdown.Converter;

    constructor(props: ISafeMarkdown) {
        super(props);
        this.converter = new Showdown.Converter();
    }

    public render() {
        try {
            const html = this.converter.makeHtml(this.props.markdown);
            return (
                <React.Fragment>
                    <SafeHtml value={html} styles={ThemeCss}/>
                </React.Fragment>
            );
        } catch (error) {
            return (
                <ErrorNotice error={error}/>
            );
        }
    }
}
