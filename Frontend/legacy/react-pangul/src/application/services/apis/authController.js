import { User } from '../../../common/model/user';

export class AuthController {
  constructor(fetch, logger) {
    this.fetch = fetch;
    this.logger = logger;
  }

  async login(username, password) {
    try {
      const response = await this.fetch.post('/fetch/auth/login', { username, password });
      if (response.ok) {
        const loginResponse = await response.json();
        if (loginResponse.success) {
          return await this.user();
        }
      }
    } catch (error) {
      this.logger.error(error);
    }
    throw new Error('Not authorized');
  }

  async logout() {
    try {
      const response = await this.fetch.post('/fetch/auth/logout', {});
      if (response.ok) {
        return await response.json();
      }
    } catch (error) {
      this.logger.error(error);
    }
    throw new Error('Not authorized');
  }

  async user() {
    try {
      const response = await this.fetch.post('/fetch/auth/claims');
      if (response.ok) {
        const userClaims = await response.json();
        return new User(userClaims.token, userClaims.claims);
      }
    } catch (error) {
      this.logger.error(error);
    }
    throw new Error('Not authorized');
  }
}
