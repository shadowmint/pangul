import { UserContext } from "../../../../react-pangul-core/src/domain/userContext";
import AuthService from "../../../../react-pangul-core/src/services/authService";

export default class UserService {
    public static async login(username: string, password: string): Promise<UserContext> {
        const authService = new AuthService();
        const userContext = new UserContext();
        await authService.login(userContext, username, password);
        if (userContext.error) {
            throw userContext.error;
        }
        return userContext;
    }
}
