import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {App} from './App';
import {ISettings} from "./packages/react-pangul-app/src/infrastructure/service/settingsProvider";
import AjaxFetch from './packages/react-pangul-core/src/infrastructure/fetch/ajaxFetch';
import registerServiceWorker from './registerServiceWorker';

new AjaxFetch("/").get<ISettings>("config.json").then((settings: ISettings) => {
    ReactDOM.render(
        <App settings={settings}/>,
        document.getElementById('root') as HTMLElement
    );
    registerServiceWorker();
});

