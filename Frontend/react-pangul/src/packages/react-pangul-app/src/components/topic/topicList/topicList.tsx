import * as React from "react";
import {QuerySet} from "../../../../../react-pangul-core/src/domain/querySet";
import {Topic} from "../../../../../react-pangul-core/src/domain/topic";
import {LayoutContentContainer} from "../../layout/layoutContentContainer/layoutContentContainer";
import {TopicView} from "../topicView/topicView";
import "./topicList.css";

export interface ITopicList {
    topics: QuerySet<Topic>;
}

export interface ITopicListState {
    pageSize: number;
    page: number;
}

export class TopicList extends React.Component<ITopicList, ITopicListState> {
    constructor(props: ITopicList) {
        super(props);
        this.state = {
            page: 0,
            pageSize: 10,
        };
    }

    public render() {
        return (
            <div className="component--TopicList">
                {this.renderList()}
            </div>
        );
    }

    public renderList() {
        if (this.props.topics.state.instances == null) {
            return [];
        }
        return this.props.topics.state.instances.map((topic) => {
            if (!topic.state.topicId) {
                return (<React.Fragment/>);
            }
            return (
                <div className="item" key={topic.state.topicId}>
                    <LayoutContentContainer>
                        <TopicView topic={topic}/>
                    </LayoutContentContainer>
                </div>
            );
        });
    }
}
