import * as React from "react";
import {UserContext} from "../../../../../react-pangul-core/src/domain/userContext";
import AuthService from "../../../../../react-pangul-core/src/services/authService";

export interface ILayoutWithPermissions {
    user: UserContext;
    requirePermissions: string[];
}

export class LayoutWithPermissions extends React.Component<ILayoutWithPermissions> {
    private auth = new AuthService();

    public render() {
        return (
            <React.Fragment>
                {this.authorized() ? this.props.children : <React.Fragment/>}
            </React.Fragment>
        );
    }

    private authorized(): boolean {
        return this.auth.hasPermissions(this.props.user, this.props.requirePermissions);
    }
}
