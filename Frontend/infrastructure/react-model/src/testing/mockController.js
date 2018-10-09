import Controller from '../controller';

export default function MockController(model, keyFetcher) {
  let fakeRepo = {};
  return class  extends Controller {
    /**
     * Creates a client-side-only instance of the model.
     */
    create() {
      return {...model};
    }

    /**
     * Fetch a single record
     * @param id The id of the record.
     * @return An instance of the model type.
     */
    async get(id) {
      await this._wait();
      if (fakeRepo[id]) {
        return JSON.parse(fakeRepo[id]);
      }
      return null;
    }

    /**
     * Save or update a record
     * @param An instance of the model type.
     */
    async put(model) {
      await this._wait();
      fakeRepo[keyFetcher(model)] = JSON.stringify(model);
    }

    /**
     * Delete a record
     * @param An instance of the model type.
     */
    async delete(model) {
      await this._wait();
      delete fakeRepo[keyFetcher(model)];
    }

    _wait() {
      return new Promise(resolve => {
        setTimeout(resolve, 100);
      });
    }
  };
}