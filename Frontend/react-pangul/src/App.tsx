import * as React from 'react';
import {Pangul} from "./packages/react-pangul-app/src/app/pangul/pangul";
import {ISettings} from "./packages/react-pangul-app/src/infrastructure/service/settingsProvider";
import {UserViewSelfProfilePage} from "./packages/react-pangul-app/src/pages/user/userViewProfile/userViewSelfProfilePage";
import {UserContext} from "./packages/react-pangul-core/src/domain/userContext";

export interface AppProps {
    settings: ISettings;
}

const appTestContent = (user: UserContext) => (
    <React.Fragment>
        <UserViewSelfProfilePage user={user}/>
    </React.Fragment>
);

export const App = (props: AppProps) => {
    const settings = {...props.settings, testContent: appTestContent};
    return (
        <Pangul settings={settings}/>
    );
};


