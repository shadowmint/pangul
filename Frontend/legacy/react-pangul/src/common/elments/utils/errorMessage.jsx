import React from 'react';
import PropTypes from 'prop-types';
import './errorMessage.scss';

const ErrorMessage = props => (
  <div className="component--ErrorMessage">
    {props.children}
  </div>
);

ErrorMessage.propTypes = {
  allowClose: PropTypes.bool,
  onClose: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

ErrorMessage.defaultProps = {
  allowClose: false,
  onClose: null,
  children: null,
};

export default ErrorMessage;