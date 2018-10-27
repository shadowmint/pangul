import * as React from "react";
import {UserContext} from "../../../../react-pangul-core/src/domain/userContext";
import AuthService from "../../../../react-pangul-core/src/services/authService";

export interface IAppAuth {
    user: UserContext;
    renderLoggedIn: () => React.ReactNode;
    renderLoggedOut: () => React.ReactNode;
}

export interface IAppAuthState {
    user: UserContext | null;
    refreshed: boolean;
}

export class AppAuth extends React.Component<IAppAuth, IAppAuthState> {
    public static getDerivedStateFromProps(props: IAppAuth, state: IAppAuthState) {
        if (props.user !== state.user) {
            return {user: props.user, refreshed: false};
        }
        return null;
    }

    private unsubscribe: (() => void) | null = null;

    public constructor(props: IAppAuth) {
        super(props);
        this.state = {
            refreshed: false,
            user: null,
        };
    }

    public componentWillUnmount() {
        if (this.unsubscribe) {
            this.unsubscribe();
            this.unsubscribe = null;
        }
    }

    public componentDidMount() {
        this.resubscribe();
    }

    public render() {

        const content = this.props.user.state.loggedIn ? this.props.renderLoggedIn() : this.props.renderLoggedOut();
        return (
            <React.Fragment>
                {content}
            </React.Fragment>
        );
    }

    public componentDidUpdate() {
        if (!this.state.refreshed) {
            this.resubscribe();
        }
    }

    private resubscribe() {
        if (this.unsubscribe) {
            this.unsubscribe();
            this.unsubscribe = null;
        }
        if (this.state.user) {
            (async () => {
                if (this.state.user) {
                    this.unsubscribe = this.state.user.subscribe(() => {
                        this.forceUpdate();
                    });

                    // Check for existing login
                    const service = new AuthService();
                    await service.refresh(this.props.user);
                }
            })().then(() => {
                this.setState({refreshed: true});
            });
        }
    }
}
