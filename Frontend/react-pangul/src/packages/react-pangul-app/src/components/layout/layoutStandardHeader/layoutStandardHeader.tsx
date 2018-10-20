import * as React from "react";
import { ITopic, Topic } from "../../../../../react-pangul-core/src/domain/topic";
import { IUserContext } from "../../../../../react-pangul-core/src/domain/userContext";
import { PageLoader } from "../../common/loaders/pageLoader";
import { TopicInfo } from "../../topic/topicInfo/topicInfo";
import { UserCurrentInfo } from "../../user/userCurrentInfo/userCurrentInfo";
import { LayoutFooter } from "../layoutFooter/layoutFooter";
import "./layoutStandardHeader.css";

export interface ILayoutStandardHeader {
    user: IUserContext;
    topic: ITopic | null;
    loading: boolean;
}

export class LayoutStandardHeader extends React.Component<ILayoutStandardHeader> {
    public render() {
        const topic = this.props.topic || new Topic().state;
        return (
            <React.Fragment>
                <div className="component--LayoutStandardHeader">
                    <PageLoader loading={this.props.loading}/>
                    <TopicInfo {...topic} />
                    <UserCurrentInfo user={this.props.user}/>
                </div>
                <LayoutFooter/>
            </React.Fragment>
        );
    }
}
