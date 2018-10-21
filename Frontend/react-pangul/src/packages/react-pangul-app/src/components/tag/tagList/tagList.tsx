import * as React from "react";
import "./tagList.css";

export interface ITagList {
    tags: string[];
}

export class TagList extends React.Component<ITagList> {
    public render() {
        // TODO: Make tag pages and link to them
        const tags = this.props.tags.map((i) => {
            return (<div key={i} className="tag">{i}</div>);
        });
        return (
            <div className="component--TagList">
                {this.props.tags.length > 0 ? tags : "No tags"}
            </div>
        );
    }
}