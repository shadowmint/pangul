import Stateful from "./stateful";

export abstract class Model<TState> extends Stateful {
    public constructor(state?: TState) {
        super(state || {});
        if (!state) {
            this._unsafeAssignState(this.blank());
        }
        this.rebind();
    }

    public get state(): TState {
        return this.props as TState;
    }

    /** Update the state and rebind parent elements */
    public async update(asyncUpdateAction: () => Promise<{ [key: string]: any } | undefined | null>): Promise<void> {
        await super.update(asyncUpdateAction);
        this.rebind();
    }

    /** Return a blank instance of TState */
    protected abstract blank(): TState;

    /** Rebind all child elements to have this as a parent */
    protected abstract rebind(): void;
}
