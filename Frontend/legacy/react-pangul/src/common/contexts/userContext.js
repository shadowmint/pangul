import { Subject } from 'rxjs';

export class UserContext {
  constructor(authService, logger, api) {
    this.api = api; // Arbitrary hook for fetch
    this.authService = authService;
    this.logger = logger;
    this.user = null;
    this.userStore = new Subject();
  }
}
