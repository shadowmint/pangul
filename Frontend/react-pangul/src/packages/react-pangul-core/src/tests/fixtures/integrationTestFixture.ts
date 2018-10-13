import {UserContext} from "../../domain/userContext";
import RestFetch from "../../infrastructure/fetch/restFetch";
import ConsoleLogger from "../../infrastructure/logger/consoleLogger";
import ProviderSingleton from "../../infrastructure/providers/providerSingleton";
import {FetchProvider} from "../../providers/fetchProvider";
import {LoggerProvider} from "../../providers/loggerProvider";
import AuthService from "../../services/authService";

class IntegrationTestFixture {
    public configure(): IntegrationTestFixture {
        FetchProvider.configure(new RestFetch("http://localhost:5000"));
        LoggerProvider.configure(() => new ConsoleLogger());
        return this;
    }

    public async withAuth(user: string, password: string, action: (user: UserContext) => Promise<void>): Promise<void> {
        const authService = new AuthService();
        const userContext = new UserContext();

        await authService.login(userContext, user, password);
        if (userContext.error != null) {
            throw new Error("Auth failure");
        }

        await action(userContext);
    }
}

const integrationTestFixtureInstance = new IntegrationTestFixture().configure();
const IntegrationTestFixtureProvider = new ProviderSingleton(integrationTestFixtureInstance);

export default IntegrationTestFixtureProvider;
