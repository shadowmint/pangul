import AuthService from '../../common/services/authService';

export default class PangulAuthService extends AuthService {
  constructor(api) {
    super(api);
    this.api = api;
  }

  loginInternal(context, username, password) {
    return this.api.auth.login(username, password);
  }

  logoutInternal(context) {
    return this.api.auth.logout();
  }
}
