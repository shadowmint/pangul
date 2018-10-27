interface ICacheEntry {
    value: any;
    expires: number;
}

export default class MemoryCache {
    private static isExpired(entry: ICacheEntry) {
        return entry.expires < Date.now();
    }

    private pending: Promise<void> | null = null;

    private readonly requests: { [key: string]: ICacheEntry } = {};

    public get<T>(requestKey: string): T | null {
        const entry = this.requests[requestKey];
        if (!entry) {
            return null;
        }

        if (MemoryCache.isExpired(entry)) {
            delete this.requests[requestKey];
            return null;
        }

        return entry.value as T;
    }

    public set(requestKey: string, result: any, expiresIn: number) {
        this.requests[requestKey] = {
            expires: Date.now() + expiresIn,
            value: result,
        };
    }

    public async waitPending(): Promise<void> {
        if (this.pending) {
            await this.pending;
        }
    }

    public async update<T>(action: () => Promise<T>): Promise<T> {
        let result: T | null = null;

        this.pending = new Promise(async (resolve, reject) => {
            try {
                result = await action();
                resolve();
            } catch (error) {
                reject(error);
            }
        });
        await this.pending;

        if (result == null) {
            throw new Error("No data returned from cache update query");
        }

        return result;
    }
}
