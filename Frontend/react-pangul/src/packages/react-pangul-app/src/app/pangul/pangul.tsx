import * as React from "react";
import {UserContext} from "../../../../react-pangul-core/src/domain/userContext";
import {LayoutTheme} from "../../components/layout/layoutTheme/layoutTheme";
import {configureApplication, ISettings} from "../../infrastructure/service/settingsProvider";
import {GenericLoginPage} from "../../pages/generic/genericLoginPage/genericLoginPage";
import {AppAuth} from "../appAuth/appAuth";
import {AppRoutes} from "../appRoutes/appRoutes";

export interface IPangul {
    settings: ISettings;
}

export interface IPangulState {
    user: UserContext;
}

export class Pangul extends React.Component<IPangul, IPangulState> {
    constructor(props: IPangul) {
        super(props);
        this.state = {
            user: new UserContext(),
        };
    }

    public componentDidMount() {
        configureApplication(this.props.settings);
    }

    public render() {
        return (
            <LayoutTheme>
                <AppAuth user={this.state.user}
                         renderLoggedIn={this.showMainContent}
                         renderLoggedOut={this.showLoginForm}/>
            </LayoutTheme>
        );
    }

    private showLoginForm = () => (<GenericLoginPage user={this.state.user}/>);

    private showMainContent = () => (<AppRoutes user={this.state.user}/>);
}
