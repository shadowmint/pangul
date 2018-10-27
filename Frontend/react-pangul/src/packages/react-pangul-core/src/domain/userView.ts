import {Model} from "../../../react-stateful/src/model";
import {UserController} from "../controllers/usersController";

export interface IUserView {
    userId: string;
    username: string;
}

export class UserView extends Model<IUserView> {
    /** Fetch a user from the user id */
    public static async get(userId: string): Promise<UserView> {
        const user = new UserView();
        user.state.userId = userId;
        await user.refresh();
        return user;
    }

    /** Reset to the default state */
    public async reset(): Promise<void> {
        await this.update(async () => {
            return this.blank();
        });
    }

    /** Fetch from the database */
    public async refresh(): Promise<void> {
        await this.update(async () => {
            const controller = new UserController();
            const userData = await controller.get(this.state.userId);
            return userData;
        });
    }

    protected blank(): IUserView {
        return {
            userId: "",
            username: "",
        };
    }

    protected rebind(): void {
        // No bindings
    }
}
