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
            const user = await this.authController.claims();
            return {
                loggedIn: true,
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

    /** Get the current logged in user, if any */
    public async refresh(user: UserContext) {
        await user.update(async () => {
            try {
                const claims = await this.authController.claims();
                return {
                    loggedIn: true,
                    permissions: claims.claims,
                    username: claims.token,
                };
            } catch (error) {
                // Not logged in
                await user.reset();
                return user.state;
            }
        });
    }
}
