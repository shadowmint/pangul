import * as React from "react";
import {Link} from "react-router-dom";
import {IUserContext} from "../../../../../react-pangul-core/src/domain/userContext";
import NavigationService from "../../../infrastructure/service/navigationService";
import "./userCurrentInfo.css";

export interface IUserCurrentInfo {
    user: IUserContext;

}

export class UserCurrentInfo extends React.Component<IUserCurrentInfo> {
    private readonly nav = new NavigationService();

    public render() {
        return (
            <div className="component--UserCurrentInfo">
                <div>
                    {this.props.user.username}
                </div>
                <div className="logout">
                    <Link to={this.nav.urlForLogout()}>logout</Link>
                </div>
            </div>
        );
    }
}
