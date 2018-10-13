import * as React from "react";
import {ITopic} from "../../../../../react-pangul-core/src/domain/topic";
import {IUserContext} from "../../../../../react-pangul-core/src/domain/userContext";
import {PageLoader} from "../../common/loaders/pageLoader";
import {UserCurrentInfo} from "../../common/user/userCurrentInfo/userCurrentInfo";
import {TopicInfo} from "../../topic/topicInfo/topicInfo";
import "./layoutStandardHeader.css";

export interface ILayoutStandardHeader {
    user: IUserContext;
    topic: ITopic;
    loading: boolean;
}

export class LayoutStandardHeader extends React.Component<ILayoutStandardHeader> {
    public render() {
        return (
            <div className="component--LayoutStandardHeader">
                <PageLoader loading={this.props.loading}/>
                <TopicInfo {...this.props.topic} />
                <UserCurrentInfo user={this.props.user}/>
            </div>
        );
    }
}
