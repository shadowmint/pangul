import React from 'react';
import PropTypes from 'prop-types';
import { UserContext } from '../../contexts/userContext';
import RequiresPermission from './requiresPermission';

const RequiresLogin = props => (
  <RequiresPermission userContext={props.userContext} permissions={[]}>
    {props.children}
  </RequiresPermission>
);


RequiresLogin.propTypes = {
  // The user context for this component
  userContext: PropTypes.instanceOf(UserContext).isRequired,

  // Content to render if the user does have permission
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

RequiresLogin.defaultProps = {
  children: null,
};

export default RequiresLogin;