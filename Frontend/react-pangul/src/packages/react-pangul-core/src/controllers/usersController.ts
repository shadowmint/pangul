import {BaseController} from "../infrastructure/baseController";
import MemoryCache from "../infrastructure/caching/memoryCache";

const userQueryCache = new MemoryCache();

export interface IUserData {
    token: string;
    authenticated: boolean;
    claims: string[];
}

export class UserController extends BaseController {
    public async get(userId: string): Promise<IUserData> {
        const requestKey = `/api/users/get::${userId}`;

        // Wait for any pending ops
        await userQueryCache.waitPending();

        // Check for resolved items
        const cachedResponse = userQueryCache.get<IUserData>(requestKey);
        if (cachedResponse) {
            return cachedResponse;
        }

        // Nope, do the full thing and cache the result
        return await userQueryCache.update(async () => {
            const result = await this.post<IUserData>("/api/users/get", {id: userId});
            userQueryCache.set(requestKey, result, 2000);
            return result;
        });
    }
}
