import React from 'react';
import PropTypes from 'prop-types';
import { UserContext } from '../../contexts/userContext';
import Loading from '../utils/loading';
import ErrorMessage from '../utils/errorMessage';
import './login.scss';

const LoginError = props => (
  <div className="error">
    <ErrorMessage>
      {props.error.message}
    </ErrorMessage>
  </div>
);

LoginError.propTypes = {
  error: PropTypes.instanceOf(Error).isRequired,
};

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      username: '',
      password: '',
    };
    this.events = {
      onLoginAttempt: data => this.onLogin(data),
      onChangeUsername: data => this.onChange(data, 'username'),
      onChangePassword: data => this.onChange(data, 'password'),
      onMaybeSubmit: (data) => {
        if (data.key === 'Enter') {
          this.events.onLoginAttempt(data);
        }
      },
    };
  }

  onChange(data, key) {
    const modifier = {};
    modifier[key] = data.target.value;
    this.setState(modifier);
  }

  onLogin(data) {
    const pwd = this.state.password;
    this.setState({ loading: true, error: null, password: '' }, async () => {
      try {
        const { authService } = this.props.userContext;
        await UserService.login(this.props.userContext, this.state.username, pwd);
      } catch (error) {
        this.setState({ error, loading: false });
      }
    });
    data.preventDefault();
    return false;
  }

  renderLoginForm() {
    return (
      <div>
        <input
          type="text"
          value={this.state.username}
          onChange={this.events.onChangeUsername}
        />
        <input
          type="password"
          value={this.state.password}
          onChange={this.events.onChangePassword}
          onKeyPress={this.events.onMaybeSubmit}
          className="password"
        />
        <button onClick={this.events.onLoginAttempt}>Login</button>
      </div>
    );
  }

  render() {
    return (
      <div className="component--Login">
        <div>
          {this.state.loading ? <Loading /> : this.renderLoginForm()}
          {this.state.error ? <LoginError error={this.state.error} /> : ''}
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  // The user context for this component
  userContext: PropTypes.instanceOf(UserContext).isRequired,
};
