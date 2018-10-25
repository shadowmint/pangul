import {BaseController} from "../infrastructure/baseController";

export interface IUserData {
    token: string;
    authenticated: boolean;
    claims: string[];
}

export class UserController extends BaseController {
    public async get(userId: string): Promise<IUserData> {
        return await this.post<IUserData>("/api/users/get", {id: userId});
    }
}
