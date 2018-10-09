/**
 * RequestStream is a last-in-first-out request stream processing handler.
 * Every incoming request is backed up, and only the running and most recent
 * request are kept in the queue.
 *
 * If a cancel request is invoked, the stream discards the entire queue with
 * no resolution and invokes a cancelled props error.
 *
 * Incoming requests are debounced using the provided Debouncer.
 *
 * @param debouncer a Debouncer instance.
 * @param onError A handler for uncaught errors.
 */
export default class RequestStream {
  constructor(debouncer, onError) {
    this.queue = null;
    this.pending = null;
    this.bouncer = debouncer;
    this.onError = onError;
  }

  /** Make a request, and then invoke resolve or reject on it.
   * @param request A function that returns a promise.
   * @param resolve The function to invoke when the promise resolves.
   * @param reject The function to invoke when promise is rejected. */
  task(request, resolve, reject) {
    this.bouncer.then(() => {
      console.log('Incoming request');
      this.updateQueue(request, resolve, reject);
    }, reject);
  }

  /** Cancel any pending request */
  cancel() {
    this.discardQueue();
    this.pending = null;
  }

  updateQueue(request, resolve, reject) {
    if (this.queue) {
      this.discardQueue();
    }
    this.queue = { request, resolve, reject };
    if (!this.pending) {
      setTimeout(() => {
        this.dispatchCurrentQueuedItem();
      }, 1);
    }
  }

  discardQueue() {
    if (!this.queue) return;
    const queue = this.queue;
    try {
      this.queue = null;
      queue.reject(new Error('Request cancelled'), true);
    } catch (error) {
      this.onError(error);
    }
  }

  dispatchCurrentQueuedItem() {
    if (this.pending) return;
    if (!this.queue) return;
    console.log('Dispatch!');
    const pending = this.queue;
    this.pending = this.queue;
    this.queue = null;
    const failure = (err, requestId) => {
      if (this.pending.id === requestId) {
        this.pending = null;
      }
      try {
        pending.reject(err);
      } catch (error) {
        this.onError(error);
      }
    };
    try {
      const requestId = this.makeRequestId();
      console.log(`Request started: ${requestId}`);
      pending.id = requestId;
      pending.request().then((...args) => {
        console.log('Resolve', args);
        this.resolveCurrentPending(failure, requestId, ...args);
      }, err => failure(err, requestId)).catch(err => failure(err, requestId));
    } catch (error) {
      failure(error);
    }
  }

  resolveCurrentPending(errorHandler, requestId, ...args) {
    const pending = this.pending;
    try {
      console.log('Resolve called with pending', pending);
      if (pending != null && pending.id === requestId) {
        this.pending = null;
        pending.resolve(...args);
      } else {
        console.log(`Rejected old request: ${requestId}`);
      }
    } catch (error) {
      errorHandler(error, requestId);
    }
    this.dispatchCurrentQueuedItem();
  }

  makeRequestId() {
    return Math.floor(Math.random() * 65535);
  }
}
