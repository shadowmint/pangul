/** The public external API for an object type */
export default class Controller {

  /**
   * Creates a client-side-only instance of the model.
   */
  create() {
    throw new Error('Not implemented');
  }

  /**
   * Fetch a single record
   * @param id The id of the record.
   * @return An instance of the model type.
   */
  get(id) {
    throw new Error('Not implemented');
  }

  /**
   * Save or update a record
   * @param An instance of the model type.
   */
  put(model) {
    throw new Error('Not implemented');
  }

  /**
   * Delete a record
   * @param An instance of the model type.
   */
  delete(model) {
    throw new Error('Not implemented');
  }
}