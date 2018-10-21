import * as React from "react";
import {Redirect} from "react-router";
import {UserContext} from "../../../../../react-pangul-core/src/domain/userContext";
import AuthService from "../../../../../react-pangul-core/src/services/authService";
import {LayoutContentContainer} from "../../../components/layout/layoutContentContainer/layoutContentContainer";
import {LayoutRightBox} from "../../../components/layout/layoutRightBox/layoutRightBox";
import {LayoutStandardHeader} from "../../../components/layout/layoutStandardHeader/layoutStandardHeader";
import NavigationService from "../../../infrastructure/service/navigationService";
import "./genericLogoutPage.css";

export interface IGenericLogoutPage {
    user: UserContext;
}

export interface IGenericLogoutPageState {
    redirect: boolean;
}

export class GenericLogoutPage extends React.Component<IGenericLogoutPage, IGenericLogoutPageState> {
    constructor(props: IGenericLogoutPage) {
        super(props);
        this.state = {
            redirect: false,
        };
    }

    public render() {
        if (this.state.redirect) {
            return <Redirect to={new NavigationService().urlForRoot()}/>;
        }
        return (
            <div className="component--GenericLogoutPage">
                <LayoutStandardHeader user={this.props.user.state}
                                      topic={null}
                                      loading={this.props.user.updating}/>
                <LayoutContentContainer>
                    <h3 className="notice">
                        Logout?
                    </h3>
                    <p>
                        Are you sure? Your current session will be abandoned.
                    </p>
                </LayoutContentContainer>
                <LayoutContentContainer>
                    <LayoutRightBox expand={true}>
                        <button onClick={this.onLogout}>Logout</button>
                    </LayoutRightBox>
                </LayoutContentContainer>
            </div>
        );
    }

    private onLogout = async () => {
        const user = this.props.user;
        this.setState({redirect: true}, async () => {
            const authService = new AuthService();
            await authService.logout(user);
        });
    }
}
