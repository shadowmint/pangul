import * as React from "react";
import "./tagList.css";
import NavigationService from "../../../infrastructure/service/navigationService";
import {Link} from "react-router-dom";

export interface ITagList {
    tags: string[];
    topic: string | null;
}

export class TagList extends React.Component<ITagList> {
    private nav: NavigationService;

    constructor(props: ITagList) {
        super(props);
        this.nav = new NavigationService();
    }

    public render() {
        // TODO: Make tag pages and link to them
        const tags = this.props.tags.map((i) => {
            // In some cases, eg. tag picker, these shouldn't be clickable.
            if (this.props.topic == null) {
                return (
                    <div key={i} className="tag">
                        {i}
                    </div>
                );
            }

            // But in most cases, they should link to the associated topic query
            const linkUrl = this.nav.urlForTopicQuery(this.props.topic, `tag:${i}`);
            return (
                <div key={i} className="tag">
                    <Link to={linkUrl}>
                        {i}
                    </Link>
                </div>
            );
        });
        if (tags.length === 0) {
            return <React.Fragment/>;
        }
        return (
            <div className="component--TagList">
                {this.props.tags.length > 0 ? tags : "No tags"}
            </div>
        );
    }
}