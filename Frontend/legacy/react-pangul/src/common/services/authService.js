/** Extend this class with a concrete implementation */
export default class AuthService {
  /** Return a promise for the user object */
  loginInternal(context, username, password) {
    return Promise.reject(new Error('Not implemented'));
  }

  /** Return a promise for logout completion */
  logoutInternal(context) {
    return Promise.reject(new Error('Not implemented'));
  }

  /** Return a promise for the user object */
  async login(context, username, password) {
    const user = await this.loginInternal(context, username, password);
    this.publish(context, user);
  }

  /** Return a promise for logout */
  async logout(context) {
    await this.logoutInternal(context);
    this.publish(context, null);
  }

  /** Publish a change to the user on a context */
  publish(context, user) {
    context.user = user;
    context.userStore.next(user);
  }

  /** Check if a user has the required permissions */
  userHasPermissions(user, permissions) {
    if (!permissions) return false;
    if (user == null) return false;
    const missingPermissions = permissions.filter(p => !user.permissions.find(i => i === p));
    return missingPermissions.length === 0;
  }
}
