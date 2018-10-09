import {AuthController} from "../controllers/authController";
import {UserContext} from "../domain/userContext";

export default class AuthService {

    private authController: AuthController;

    constructor() {
        this.authController = new AuthController();
    }

    public async login(context: UserContext, username: string, password: string) {
        await context.update(async () => {
            await this.authController.login(username, password);
            const user = await this.authController.user();
            return {
                permissions: user.claims,
                username: user.token,
            };
        });
    }

    public async logout(context: UserContext) {
        await context.update(async () => {
            await this.authController.logout();
            await context.reset();
            return null;
        });
    }

    /** Check if a user has the required permissions */
    public hasPermissions(user: UserContext, permissions: string[]): boolean {
        if (permissions.length === 0) {
            return false;
        }
        if (user == null) {
            return false;
        }
        const missingPermissions = permissions.filter((p) => !user.state.permissions.find((i) => i === p));
        return missingPermissions.length === 0;
    }
}
