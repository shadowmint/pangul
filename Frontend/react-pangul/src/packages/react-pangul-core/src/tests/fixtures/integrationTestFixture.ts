import RestFetch from "../../infrastructure/fetch/restFetch";
import ConsoleLogger from "../../infrastructure/logger/consoleLogger";
import {FetchProvider} from "../../providers/fetchProvider";
import {LoggerProvider} from "../../providers/loggerProvider";
import ProviderSingleton from "../../infrastructure/providers/providerSingleton";
import AuthService from "../../services/authService";
import {UserContext} from "../../domain/userContext";

class IntegrationTestFixture {
    public configure(): IntegrationTestFixture {
        FetchProvider.configure(new RestFetch("http://localhost:5000"));
        LoggerProvider.configure(() => new ConsoleLogger());
        return this;
    }

    public async withAuth(username: string, password: string, action: (user: UserContext) => Promise<void>): Promise<void> {
        const authService = new AuthService();
        const userContext = new UserContext();

        await authService.login(userContext, username, password);
        if (userContext.error != null) {
            throw new Error("Auth failure");
        }

        await action(userContext);
    }
}

const integrationTestFixtureInstance = new IntegrationTestFixture().configure();
const IntegrationTestFixtureProvider = new ProviderSingleton(integrationTestFixtureInstance);

export default IntegrationTestFixtureProvider;