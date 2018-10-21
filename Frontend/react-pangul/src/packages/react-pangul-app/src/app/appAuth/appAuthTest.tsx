import * as React from "react";
import {UserContext} from "../../../../react-pangul-core/src/domain/userContext";
import {
    ITestProps,
    ITestState,
} from "../../infrastructure/componentHelpers/testComponent";
import {GenericLoginPage} from "../../pages/generic/genericLoginPage/genericLoginPage";
import {AppRoutes} from "../appRoutes/appRoutes";
import {AppAuth} from "./appAuth";

export default class AppAuthTest extends React.Component<ITestProps, ITestState> {
    constructor(props: ITestProps) {
        super(props);
        this.state = {
            user: new UserContext(),
        };
    }

    public render() {
        return <React.Fragment>
            <AppAuth user={this.state.user}
                     renderLoggedIn={this.showMainContent}
                     renderLoggedOut={this.showLoginForm}/>
        </React.Fragment>;
    }

    private showLoginForm = () => (<GenericLoginPage user={this.state.user}/>);

    private showMainContent = () => (<AppRoutes user={this.state.user}/>);
}
