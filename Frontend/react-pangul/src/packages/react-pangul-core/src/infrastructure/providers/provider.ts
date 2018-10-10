export default abstract class Provider<T> {
    public get(): T {
        const instance = this.provide();
        if (!instance) {
            throw new Error("Provider not configured");
        }
        return instance;
    }

    protected abstract provide(): T | null;
}