import React from 'react';
import Login from '../../../src/common/elments/auth/login';
import { User } from '../../../src/common/model/user';
import AuthGuard from '../../../src/common/elments/auth/authGuard';
import { Logger } from '../../../src/common/services/logger';
import AuthService from '../../../src/common/services/authService';
import RequiresPermission from '../../../src/common/elments/auth/requiresPermission';
import { UserContext } from '../../../src/common/contexts/userContext';
import NotAuthorized from '../../../src/common/elments/auth/notAuthorized';
import Logout from '../../../src/common/elments/auth/logout';
import RequiresLogin from '../../../src/common/elments/auth/requiresLogin';

class FakeAuth extends AuthService {
  async loginInternal(context, username, password) {
    await this.sleep(2000);
    if (username === 'admin' && password === 'admin') {
      return new User('admin', ['user', 'permA']);
    }
    if (username === 'fake' && password === 'fake') {
      return new User('admin', ['permB']);
    }
    throw new Error('Not authorized');
  }

  async logoutInternal(context) {
    if (context.user == null) throw new Error('Not logged in');
    await this.sleep(2000);
  }

  sleep(duration) {
    return new Promise((resolve) => {
      setTimeout(resolve, duration);
    });
  }
}

const mutableUser = new UserContext(new FakeAuth(), new Logger());

const authorizedUser = new UserContext(new FakeAuth(), new Logger());
authorizedUser.user = new User('admin', ['user']);

const unauthorizedUser = new UserContext(new FakeAuth(), new Logger());
unauthorizedUser.user = new User('admin', ['perm']);

const notLoggedInUser = new UserContext(new FakeAuth(), new Logger());

export default class AuthDemo extends React.Component {
  constructor(props) {
    super(props);
    this.state = { user: null };
    mutableUser.userStore.subscribe((user) => {
      this.setState({ user });
    });
  }

  render() {
    return (
      <React.Fragment>
        <div className="example short">Not logged in? Try using admin/admin or fake/fake</div>

        <div className="example">
          <div className="box">
            <RequiresLogin userContext={mutableUser}>
              <div>
                Logged in: {(this.state.user || {}).name}
                <Logout userContext={mutableUser} />
              </div>
              <NotAuthorized>
                <Login userContext={mutableUser} />
              </NotAuthorized>
            </RequiresLogin>
          </div>
        </div>

        <div className="example">
          <div className="box">
            Should be authorized:
            <RequiresPermission userContext={authorizedUser} permissions={['user']}>
              <div>
                Some authorized content goes here!
              </div>
            </RequiresPermission>
          </div>

          <div className="box">
            Not authorized:
            <RequiresPermission userContext={notLoggedInUser} permissions={['user']}>
              <div>
                Hidden content here is never rendered
              </div>
            </RequiresPermission>
          </div>

          <div className="box">
            Partial auth:
            <RequiresPermission userContext={unauthorizedUser} permissions={['perm']}>
              <div>
                Some authorized content goes here!
              </div>
              <NotAuthorized>
                <div>
                  Permission denied!
                </div>
              </NotAuthorized>
            </RequiresPermission>
            <RequiresPermission userContext={unauthorizedUser} permissions={['user']}>
              <div>
                Some authorized content goes here!
              </div>
              <NotAuthorized>
                <div>
                  Permission denied to other section.
                </div>
              </NotAuthorized>
            </RequiresPermission>
          </div>
        </div>

        <div className="example">
          <AuthGuard userContext={mutableUser}>
            <div>
              Logged in content! <Logout userContext={mutableUser} />
            </div>
            <div>
              But below is are sections with different permission requirements!
            </div>
            <div>
              <RequiresPermission userContext={mutableUser} permissions={['user']}>
                <div>
                  Some authorized content goes here!
                </div>
                <NotAuthorized>
                  No permission for this user!
                </NotAuthorized>
              </RequiresPermission>
            </div>
          </AuthGuard>
        </div>
      </React.Fragment>
    );
  }
}
