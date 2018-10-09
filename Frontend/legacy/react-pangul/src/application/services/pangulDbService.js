export default class PangulDbService {
  constructor(api) {
    this.api = api;
  }

  getMigrationStatus() {
    return this.api.db.getMigrationStatus();
  }
}
