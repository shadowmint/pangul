import { Subject } from "rxjs";
import { debounceTime } from "rxjs/operators";
import Stateful from "../../../../react-stateful/src/stateful";

export interface ITrackedComponent {
    tracker: Subject<void> | null;
    subscriptions: { [key: string]: () => void };

    triggerStateChanged(): void;

    componentDidUpdate(): void;

    componentWillUnmount(): void;
}

export function trackComponentState<T extends Stateful>(key: string, next: T, prev: T, self: ITrackedComponent) {
    // No change
    if (next === prev) {
        return;
    }

    // Init
    initializeTracker(self);
    const subs = self.subscriptions;

    // Remove old subscription
    if (subs[key]) {
        subs[key]();
    }

    subs[key] = next.subscribe(() => {
        if (self.tracker != null) {
            self.tracker.next();
        }
    });
}

export function haltComponentTracking(self: ITrackedComponent) {
    const subs = self.subscriptions;
    for (const kv of Object.entries(subs)) {
        delete subs[kv[0]];
        kv[1]();
    }
    if (self.tracker != null) {
        self.tracker.complete();
        self.tracker = null;
    }
}

function initializeTracker(self: ITrackedComponent) {
    if (self.tracker === null) {
        self.tracker = new Subject<void>();
        self.tracker.pipe(debounceTime(10)).subscribe(() => {
            self.triggerStateChanged();
        });
    }
}
