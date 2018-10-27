import * as React from "react";
import {UserContext} from "../../../../react-pangul-core/src/domain/userContext";
import AjaxFetch from "../../../../react-pangul-core/src/infrastructure/fetch/ajaxFetch";
import ConsoleLogger from "../../../../react-pangul-core/src/infrastructure/logger/consoleLogger";
import ProviderSingleton from "../../../../react-pangul-core/src/infrastructure/providers/providerSingleton";
import { FetchProvider } from "../../../../react-pangul-core/src/providers/fetchProvider";
import { LoggerProvider } from "../../../../react-pangul-core/src/providers/loggerProvider";

export interface ITestSettings {
    test: boolean;
    testUser: string;
    testUserAuth: string;
    testContent: null | ((user: UserContext) => React.ReactNode);
}

export interface ISettings {
    backendUrl: string;
    baseUrl: string;
    footerNotice: string;
    test: ITestSettings;
}

export const SettingsProvider = new ProviderSingleton<ISettings>(null);

export function configureApplication(settings: ISettings) {
    FetchProvider.configure(new AjaxFetch(settings.backendUrl));
    LoggerProvider.configure(() => new ConsoleLogger());
    SettingsProvider.configure(settings);
}
