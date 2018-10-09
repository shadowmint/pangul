export default class Debounce {
  constructor(timeout, onError) {
    this.state = null;
    this.timeout = timeout;
    this.reject = null;

    // eslint-disable-next-line no-console
    this.onError = !onError ? e => console.log(e) : onError;
  }

  /** If there is no props change before the timeout, invoke resolve otherwise reject. */
  then(resolve, reject) {
    this.resetState();
    this.reject = reject;
    this.state = setTimeout(() => {
      try {
        resolve();
      } catch (error) {
        this.onError(error);
      }
    }, this.timeout);
  }

  resetState() {
    if (this.state != null) {
      if (this.reject) {
        try {
          this.reject(null, true);
        } catch (error) {
          this.onError(error);
        }
      }
      clearTimeout(this.state);
      this.state = null;
    }
  }
}
