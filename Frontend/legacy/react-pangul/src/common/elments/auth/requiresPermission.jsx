import React from 'react';
import PropTypes from 'prop-types';
import { UserContext } from '../../contexts/userContext';
import NotAuthorized from './notAuthorized';


export default class RequiresPermission extends React.Component {
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

  constructor(props) {
    super(props);
    this.state = RequiresPermission.updateUserSubscription(props.userContext, {
      onUserChanged: (user) => {
        this.setState({ user });
      },
    });
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState) {
      if (prevState.userContext === nextProps.userContext) return prevState;
    }
    return RequiresPermission.updateUserSubscription(nextProps.userContext, prevState || {});
  }

  componentWillUnmount() {
    if (this.state.subscription) {
      this.state.subscription.unsubscribe();
    }
  }

  hasPermission() {
    try {
      const { authService } = this.state.userContext;
      return authService.userHasPermissions(this.state.user, this.props.permissions);
    } catch (error) {
      this.state.userContext.logger.error(error);
      return false;
    }
  }

  render() {
    const hasPermission = this.hasPermission();
    const children = React.Children.map(this.props.children, child => child, null) || [];
    const content = children.filter(i => i.type !== NotAuthorized);
    const fallback = children.filter(i => i.type === NotAuthorized);
    return (
      <React.Fragment>
        {hasPermission ? content : fallback}
      </React.Fragment>
    );
  }
}

RequiresPermission.propTypes = {
  // The permissions required for this block
  permissions: PropTypes.arrayOf(PropTypes.string).isRequired,

  // The user context for this component
  userContext: PropTypes.instanceOf(UserContext).isRequired,

  // Content to render if the user does have permission
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

RequiresPermission.defaultProps = {
  children: null,
};
