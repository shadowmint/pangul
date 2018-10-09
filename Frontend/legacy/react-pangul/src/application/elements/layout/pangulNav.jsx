import React from 'react';
import { Link } from 'react-router-dom';
import './pangulNav.scss';
import RequiresPermission from '../../../common/elments/auth/requiresPermission';
import { AdminRolesView } from '../../consts/permissions';
import PangulContext from "../../pangulContext";

class PangulNav extends React.Component {
  constructor(props) {
    super(props);
    this.state = { open: false };
    this.events = {
      toggle: ev => this.onToggle(ev),
    };
  }

  onToggle(ev) {
    this.setState({ open: !this.state.open });
    ev.preventDefault();
  }

  renderClosed() {
    if (this.state.open) return '';
    return (
      <button className="burger" onClick={this.events.toggle}>
        Closed
      </button>
    );
  }

  renderOpen() {
    if (!this.state.open) return '';
    return (
      <React.Fragment>
        <button className="burger" onClick={this.events.toggle}>
          Open
        </button>
        {this.renderNav()}
      </React.Fragment>
    );
  }

  renderNav() {
    return (
      <React.Fragment>
        <nav onClick={this.events.toggle}>
          <Link to="/questions">Explore</Link>
          <Link to="/ask">Ask</Link>
          <PangulContext.Consumer>
            {context => (
                <RequiresPermission permissions={[AdminRolesView]} userContext={context.userContext}>
                  <Link to="/admin">Admin</Link>
                </RequiresPermission>    
            )}
          </PangulContext.Consumer>
        </nav>
        <div className="fade" onClick={this.events.toggle} />
      </React.Fragment>
    );
  }

  render() {
    return (
      <div className="component--PangulNav">
        {this.renderClosed()}
        {this.renderOpen()}
      </div>
    );
  }
}

export default PangulNav;
