let fetchInstance = null;

export default class FetchProvider {
  constructor() {
    this.fetch = fetchInstance;
  }

  static configure(fetch) {
    fetchInstance = fetch;
  }
}