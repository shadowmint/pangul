import * as React from "react";
import {UserContext} from "../../../../../react-pangul-core/src/domain/userContext";
import AuthService from "../../../../../react-pangul-core/src/services/authService";
import {PageLoader} from "../../../components/common/loaders/pageLoader";
import {LayoutContentContainer} from "../../../components/layout/layoutContentContainer/layoutContentContainer";
import {LayoutFormContainer} from "../../../components/layout/layoutFormContainer/layoutFormContainer";
import {LayoutRightBox} from "../../../components/layout/layoutRightBox/layoutRightBox";
import "./genericLoginPage.css";

export interface IGenericLoginPage {
    user: UserContext;
}

export interface IGenericLoginPageState {
    username: string;
    password: string;
}

export class GenericLoginPage extends React.Component<IGenericLoginPage, IGenericLoginPageState> {
    public constructor(props: IGenericLoginPage) {
        super(props);
        this.state = {
            password: "...",
            username: "username",
        };
    }

    public render() {
        return (
            <div className="component--GenericLoginPage">
                <PageLoader loading={this.props.user.updating}/>
                <LayoutContentContainer>
                    <h3 className="notice">
                        Login required
                    </h3>
                </LayoutContentContainer>
                <LayoutFormContainer error={this.props.user.error}>
                    <form onSubmit={this.onSubmitLogin}>
                        <fieldset>
                            <input type="text" value={this.state.username} onChange={this.onUsernameChange}/>
                        </fieldset>
                        <fieldset>
                            <input type="password" value={this.state.password} onChange={this.onPasswordChange}/>
                        </fieldset>
                        <LayoutRightBox expand={true}>
                            <button>Login</button>
                        </LayoutRightBox>
                    </form>
                </LayoutFormContainer>
            </div>
        );
    }

    private onSubmitLogin = (e: React.FormEvent) => {
        e.preventDefault();
        const service = new AuthService();
        service.login(this.props.user, this.state.username, this.state.password);
    }

    private onUsernameChange = (e: React.FormEvent<HTMLInputElement>) => {
        this.setState({
            username: e.currentTarget.value,
        });
    }

    private onPasswordChange = (e: React.FormEvent<HTMLInputElement>) => {
        this.setState({
            password: e.currentTarget.value,
        });
    }
}
