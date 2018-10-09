import {Subject} from 'rxjs';

export default class Stateful {
  constructor(state, parent) {
    this.props = state;
    this.error = null;
    this.updating = false;
    this.parent = parent;
    this._subs = [];
    this._observer = new Subject(this);
  }

  /** Update the parent for this object and return itself  */
  reparent(parent) {
    this.parent = parent;
    return this;
  }

  /**
   * Perform some update to the props of this object
   * @param action A function that eventually returns a props delta.
   */
  async update(action) {
    const deferred = this._startUpdate();
    try {
      const delta = await action();
      if (delta) {
        this.props = {...this.props, ...delta};
        await this._endUpdate(deferred, null, true);
      }
      else {
        await this._endUpdate(deferred, null, false);
      }
    }
    catch (error) {
      await this._endUpdate(deferred, error, true);
    }
  }

  /** Subscribe to changes on this model */
  watch(onChange) {
    this._subs.push(this._observer.subscribe(onChange));
  }

  /** Dispose any pending operations */
  dispose() {
    this._subs.map(i => i.unsubscribe());
    this._subs = [];
  }

  _startUpdate() {
    this.error = null;
    this.updating = true;

    let resolver = null;
    const promise = new Promise(resolve => {
      resolver = resolve;
    });
    resolver.__promise = promise;

    if (this.parent) {
      this.parent.update(async () => {
        const error = await promise;
        if (error) {
          throw error;
        }
      });
    }

    return resolver;
  }

  async _endUpdate(resolver, error, didUpdate) {
    this.error = error;
    this.updating = false;
    resolver(error);
    if (didUpdate) {
      this._observer.next(this);
    }
  }
}