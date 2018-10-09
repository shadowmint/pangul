import Stateful from './stateful';

export default class Model extends Stateful {
  constructor(key, controller, parent) {
    super(controller.create(), parent);
    this.modified = false;
    this._controller = controller;
    this._key = key;
  }

  async update(action) {
    await super.update(action);
    this.modified = true;
  }

  async save() {
    this.error = null;
    await this.update(async () => {
      await this._controller.put(this.props);
    });
    if (!this.error) {
      this.modified = false;
    }
  }

  async get(id) {
    this.error = null;
    await this.update(async () => {
      const instance = await this._controller.get(id);
      if (instance == null) {
        throw new Error(`No match for identity ${id}`)
      }
      return instance;
    });
    if (this.error == null) {
      this.modified = false;
    }
    return this;
  }

  async delete() {
    this.error = null;
    await this.update(async () => {
      await this._controller.delete(this);
      const delta = {};
      delta[this._key] = null;
      return delta;
    });
  }
}