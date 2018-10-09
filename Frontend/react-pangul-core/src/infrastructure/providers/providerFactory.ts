import Provider from "./provider";

export default class ProviderFactory<T> extends Provider<T> {
    public constructor(private factory: (() => T) | null) {
        super();
    }

    public configure(factory: () => T) {
        this.factory = factory;
    }

    protected provide(): T | null {
        return this.factory == null ? null : this.factory();
    }
}
