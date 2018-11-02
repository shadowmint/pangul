import * as React from 'react';
import {Pangul} from "./packages/react-pangul-app/src/app/pangul/pangul";
import {ISettings} from "./packages/react-pangul-app/src/infrastructure/service/settingsProvider";
import {UserViewSelfProfilePage} from "./packages/react-pangul-app/src/pages/user/userViewProfile/userViewSelfProfilePage";
import {UserContext} from "./packages/react-pangul-core/src/domain/userContext";

export interface IApp {
    settings: ISettings
}

export class App extends React.Component<IApp> {
    public render() {
        const settings = {...this.props.settings, textContent: this.testContent};
        return (
            <Pangul settings={settings}/>
        );
    }

    private testContent = (user: UserContext) => (
        <React.Fragment>
            <UserViewSelfProfilePage user={user}/>
        </React.Fragment>
    )
}
