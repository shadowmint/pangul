import React from 'react';
import PropTypes from 'prop-types';
import { User } from '../../model/user';
import { AuthService } from '../../services/authService';
import { Logger } from '../../services/logger';
import RequiresPermission from './requiresPermission';
import Login from './login';
import { UserContext } from '../../contexts/userContext';

export class AuthGuardProp {
}

/**
 * AuthGuard is a top level component for ensuring a user is logged in,
 * and triggering a challenge response if they are not logged in.
 */
export default class AuthGuard extends React.Component {
  constructor(props) {
    super(props);
    this.state = RequiresPermission.updateUserSubscription(props.userContext, {
      onUserChanged: (user) => {
        this.setState({ user });
      },
    });
    this.events = {
      onLoggedIn: user => this.setState({ user }),
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState) {
      if (prevState.userContext === nextProps.userContext) return prevState;
    }
    return RequiresPermission.updateUserSubscription(nextProps.userContext, prevState || {});
  }

  static updateUserSubscription(userContext, prevState) {
    if (prevState.subscription) {
      prevState.subscription.unsubscribe();
    }
    return {
      user: userContext.user,
      userContext,
      onUserChanged: prevState.onUserChanged,
      subscription: userContext.userStore.subscribe(prevState.onUserChanged),
    };
  }

  renderLogin() {
    return (
      <Login userContext={this.props.userContext} onLoggedIn={this.events.onLoggedIn} />
    );
  }

  renderContent() {
    return (
      <RequiresPermission
        userContext={this.props.userContext}
        permissions={[]}
      > {this.props.children}
      </RequiresPermission>
    );
  }

  render() {
    return (
      <React.Fragment>
        {this.state.user ? this.renderContent() : this.renderLogin()}
      </React.Fragment>
    );
  }

  componentWillUnmount() {
    if (this.state.subscription) {
      this.state.subscription.unsubscribe();
    }
  }
}

AuthGuard.propTypes = {
  userContext: PropTypes.instanceOf(UserContext).isRequired,

  // Content to render if the user does have permission
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

AuthGuard.defaultProps = {
  children: null,
};