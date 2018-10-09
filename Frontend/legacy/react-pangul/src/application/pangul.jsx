import React from 'react';
import Spinner from 'react-qa/src/glyphs/spinner';
import PangulLayout from './pangulLayout';
import PangulAuthService from './services/pangulAuthService';
import {PangulLogger} from './services/pangulLogger';
import {UserContext} from '../common/contexts/userContext';
import AuthGuard from '../common/elments/auth/authGuard';
import {PangulApiService} from './services/pangulApiService';
import PangulContext from './pangulContext';
import './pangul.scss';

export default class Pangul extends React.Component {
  constructor(props) {
    super(props);
    this.logger = new PangulLogger();
    this.api = new PangulApiService(this.logger);
    this.state = {
      loading: true,
      user: null,
      api: this.api, 
      userContext: new UserContext(
          new PangulAuthService(this.api),
          new PangulLogger(),
          this.api,
      ),
    };

    this.subscription = this.state.userContext.userStore.subscribe((user) => {
      this.setState({user, loading: false});
    });

    this.startUp();
  }

  componentWillUnmount() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  async startUp() {
    await this.loadConfig();

    await this.loadUser();
    await this.sleep(100);
    this.setState({loading: false});
  }

  async loadConfig() {
    const config = await this.api.assets.config();
    this.api.configure(config);
  }

  async loadUser() {
    try {
      const user = await this.api.auth.user();
      this.state.userContext.authService.publish(this.state.userContext, user);
    } catch (error) {
      // Ignore; it just means we have no current user.
      this.setState({loading: false});
    }
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  renderLoading() {
    return (
        <div className="loading">
          <Spinner size={32}/>
        </div>
    );
  }

  renderContent() {
    return (
        <PangulContext.Consumer>
          {context => (
              <AuthGuard userContext={context.userContext}>
                {this.state.user ? <PangulLayout/> : ''}
              </AuthGuard>
          )}
        </PangulContext.Consumer>
    );
  }

  render() {
    return (
        <PangulContext.Provider value={this.state}>
          <div className="component--Pangul">
            {this.state.loading ? this.renderLoading() : this.renderContent()}
          </div>
        </PangulContext.Provider>
    );
  }
}
