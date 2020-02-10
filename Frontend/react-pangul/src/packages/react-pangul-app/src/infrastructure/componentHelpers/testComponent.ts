import { UserContext } from "../../../../react-pangul-core/src/domain/userContext";
import { LoggerProvider } from "../../../../react-pangul-core/src/providers/loggerProvider";

import { SettingsProvider } from "../service/settingsProvider";
import UserService from "../service/userService";

export interface ITestState {
    user: UserContext;
}

export interface ITestProps {
    test: boolean;
}

export interface ITestComponent {
    componentDidMount(): void;
}

export function loadTestUserAnd(performAction: (user: UserContext) => void, skipLogin: boolean = false): void {
    const logger = LoggerProvider.get();
    const settings = SettingsProvider.get();
    if (!settings.test || !settings.test.test) {
        throw new Error("Testing is disabled in settings");
    }
    if (skipLogin) {
        performAction(new UserContext());
    } else {
        UserService.login(settings.test.testUser, settings.test.testUserAuth).then((user) => {
            performAction(user);
        }, (err) => {
            logger.error(err);
        });
    }
}
