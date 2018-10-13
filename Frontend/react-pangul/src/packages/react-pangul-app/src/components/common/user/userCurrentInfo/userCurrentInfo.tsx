import * as React from "react";
import { IUserContext } from "../../../../../../react-pangul-core/src/domain/userContext";
import "./userCurrentInfo.css";

export interface IUserCurrentInfo {
    user: IUserContext;

}

export class UserCurrentInfo extends React.Component<IUserCurrentInfo> {
    public render() {
        return (
            <div className="component--UserCurrentInfo">
                {this.props.user.username}
            </div>
        );
    }
}