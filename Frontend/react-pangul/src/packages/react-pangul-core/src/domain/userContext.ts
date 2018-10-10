import {Model} from "../../../react-stateful/src/model";

export interface IUserContext {
    username: string;
    permissions: string[];
}

export class UserContext extends Model<IUserContext> {
    /** Reset to the default state */
    public async reset(): Promise<void> {
        await this.update(async () => {
            return this.blank();
        });
    }

    protected blank(): IUserContext {
        return {
            permissions: [],
            username: "anonymous user",
        };
    }

    protected rebind(): void {
        // No bindings
    }
}
