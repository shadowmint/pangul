import * as React from "react";
import {UserView} from "../../../../../react-pangul-core/src/domain/userView";
import "./userSummary.css";

export interface IUserSummary {
    user: UserView;
}

export class UserSummary extends React.PureComponent<IUserSummary> {
    public render() {
        return (
            <div className="component--UserSummary">
                by: {this.props.user.state.username}
            </div>
        );
    }
}
