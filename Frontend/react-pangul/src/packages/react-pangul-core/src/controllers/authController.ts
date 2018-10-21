import {BaseController} from "../infrastructure/baseController";

export interface IUserClaims {
    token: string;
    authenticated: boolean;
    claims: string[];
}

export class AuthController extends BaseController {
    public async login(username: string, password: string): Promise<void> {
        return await this.post<void>("/api/auth/login", {username, password});
    }

    public async logout(): Promise<void> {
        return await this.post<void>("/api/auth/logout", null);
    }

    public async claims(): Promise<IUserClaims> {
        return this.post<IUserClaims>("/api/auth/claims", null);
    }
}
