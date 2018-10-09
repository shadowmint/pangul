import React from 'react';
import PropTypes from 'prop-types';
import { UserContext } from '../../contexts/userContext';
import Loading from '../utils/loading';
import './logout.scss';
import NotAuthorized from "./notAuthorized";

const LogoutError = props => (
  <div className="error">
    {props.error.message}
  </div>
);

LogoutError.propTypes = {
  error: PropTypes.instanceOf(Error).isRequired,
};

export default class Logout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
    this.events = {
      onLogoutAttempt: data => this.onLogout(data),
    };
  }

  onLogout(data) {
    this.setState({ loading: true, error: null }, () => {
      setTimeout(async () => {
        try {
          const { authService } = this.props.userContext;
          await authService.logout(this.props.userContext);
        } catch (error) {
          this.setState({ error, loading: false });
        }
      }, 200);
    });
    data.preventDefault();
    return false;
  }

  // TODO: Make this a dynamic content object using a child prop?
  renderLogoutForm() {
    return (
      <div className="content">
        <button onClick={this.events.onLogoutAttempt}>
          {this.props.children}
        </button>
      </div>
    );
  }

  render() {
    return (
      <div className="component--Logout">
        {this.state.loading ? <Loading /> : this.renderLogoutForm()}
        {this.state.error ? <LogoutError error={this.state.error} /> : ''}
      </div>
    );
  }
}

Logout.propTypes = {
  // The user context for this component
  userContext: PropTypes.instanceOf(UserContext).isRequired,

  // Content to capture loguts on
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

NotAuthorized.defaultProps = {
  children: null,
};

