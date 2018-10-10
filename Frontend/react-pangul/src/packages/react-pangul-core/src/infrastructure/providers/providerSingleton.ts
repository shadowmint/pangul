import Provider from "./provider";

export default class ProviderSingleton<T> extends Provider<T> {
    public constructor(private instance: T | null) {
        super();
    }

    public configure(instance: T) {
        this.instance = instance;
    }

    protected provide(): T | null {
        return this.instance;
    }
}
