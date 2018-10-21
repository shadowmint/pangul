import * as React from "react";
import {UserContext} from "../../../../react-pangul-core/src/domain/userContext";
import AuthService from "../../../../react-pangul-core/src/services/authService";

export interface IAppAuth {
    user: UserContext;
    renderLoggedIn: () => React.ReactNode;
    renderLoggedOut: () => React.ReactNode;
}

export interface IAppAuthState {
    user: UserContext;
}

export class AppAuth extends React.Component<IAppAuth, IAppAuthState> {
    private unsubscribe: (() => void) | null = null;

    public componentDidMount() {
        this.unsubscribe = this.props.user.subscribe(() => {
            this.forceUpdate();
        });

        // Check for existing login
        const service = new AuthService();
        service.refresh(this.props.user);
    }

    public componentWillUnmount() {
        if (this.unsubscribe) {
            this.unsubscribe();
            this.unsubscribe = null;
        }
    }

    public render() {
        const content = this.props.user.state.loggedIn ? this.props.renderLoggedIn() : this.props.renderLoggedOut();
        return (
            <React.Fragment>
                {content}
            </React.Fragment>
        );
    }
}
