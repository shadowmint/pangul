import {Subject} from "rxjs";

export default class Stateful {
    public parent: Stateful | null;

    public props: { [key: string]: any };

    public error: Error | null;

    public updating: boolean;

    /** If a deep update is taking place (eg. update in update), resolve it using this */
    private updateDepth = 0;

    /** The internal observer for this object's props */
    private observer = new Subject<Stateful>();

    constructor(state?: { [key: string]: any }) {
        this.error = null;
        this.updating = false;
        this.parent = null;
        this.props = {};
        this._unsafeAssignState(state);
    }

    /**
     * Subscribe to updates on this object.
     * @param onUpdate The action to invoke on an update.
     * @return A closure to unsubscribe.
     */
    public subscribe(onUpdate: () => void): () => void {
        const subscriber = this.observer.subscribe(onUpdate);
        return () => {
            subscriber.unsubscribe();
        };
    }

    /** Update the object, or least make some attempt to do so */
    public async update(asyncUpdateAction: () => Promise<{ [key: string]: any } | undefined | null>): Promise<void> {
        this._startUpdate();
        try {
            const delta = await asyncUpdateAction();
            if (delta) {
                this.props = {...this.props, ...delta};
            }
        } catch (error) {
            this.error = error;
        }
        this._completedUpdate();
    }

    public _startUpdate() {
        this.updateDepth += 1;
        this.updating = true;
        if (this.updateDepth === 1) {
            this.observer.next(this);
        }
        if (this.parent) {
            this.parent._startUpdate();
        }
    }

    public _completedUpdate() {
        this.updateDepth -= 1;
        if (this.updateDepth === 0) {
            this.updating = false;
            if (this.parent) {
                this.parent._completedUpdate();
            }
            this.observer.next(this);
        }
    }

    protected _unsafeAssignState(state?: { [key: string]: any }) {
        if (state) {
            this.props = state;
            try {
                for (const entry of Object.entries(state)) {
                    if (entry[1] instanceof Stateful) {
                        entry[1].parent = this;
                    }
                }
            } catch (_) {
                // props wasn't a map.
            }
        }
    }
}
