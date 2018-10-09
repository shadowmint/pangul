import 'whatwg-fetch';

export class BackendFetch {
  constructor() {
    this.backend = '/';
  }

  post(url, data) {
    const apiHeaders = new Headers({
      'X-Requested-With': 'PANGUL',
      'Content-Type': 'application/json',
      Accept: '*/*',
    });
    return fetch(`${this.backend}${url}`, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      redirect: 'follow',
      credentials: 'include',
      headers: apiHeaders,
      body: JSON.stringify(data),
    });
  }
}
