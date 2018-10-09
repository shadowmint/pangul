export class AdminDbController {
  constructor(fetch, logger) {
    this.fetch = fetch;
    this.logger = logger;
  }

  async getMigrationStatus() {
    try {
      const response = await this.fetch.post('/fetch/adminDb/migrationStatus');
      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          return data.data;
        }
      }
      this.logger.error('Failed', response);
    } catch (error) {
      this.logger.error(error);
    }
    throw new Error('API request failed');
  }
}
