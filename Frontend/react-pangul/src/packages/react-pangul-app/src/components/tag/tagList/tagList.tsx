import * as React from "react";
import "./tagList.css";

export interface ITagList {
    tags: string[];
}

export class TagList extends React.Component<ITagList> {
    public render() {
        return (
            <div className="component--TagList">
                {this.props.tags.length > 0 ? this.props.tags.join(", ") : "No tags"}
            </div>
        );
    }
}