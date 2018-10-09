import Controller from 'react-model/src/controller';
import LoggerProvider from './loggerProvider';
import FetchProvider from './fetchProvider';

export default class BaseController extends Controller {
  constructor(rootUrl, keyFetcher) {
    super();
    this._backend = new FetchProvider().fetch;
    this._logger = new LoggerProvider().logger;
    this._rootUrl = rootUrl;
    this._keyFetcher = keyFetcher;
  }

  async get(id) {
    return await this._fetch(`${this._rootUrl}/get`, {id: id});
  }

  async put(model) {
    const id = this._keyFetcher(model);
    if (id) {
      return await this._fetch(`${this._rootUrl}/update`, model);
    }
    return await this._fetch(`${this._rootUrl}/add`, model);
  }

  async delete(model) {
    const id = this._keyFetcher(model);
    if (id) {
      await this._fetch(`${this._rootUrl}/delete`, model);
    }
  }

  async _fetch(url, payload) {
    try {
      console.log(this);
      const response = await this._backend.post(url, payload);
      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          return data.data;
        }
      }
      this._logger.error('Failed', response);
    } catch (error) {
      this._logger.error(error);
    }
    throw new Error('API request failed');
  }
}