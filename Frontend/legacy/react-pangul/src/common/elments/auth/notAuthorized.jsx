import React from 'react';
import PropTypes from 'prop-types';

export default function NotAuthorized(props) {
  return (
    <React.Fragment>
      {props.children}
    </React.Fragment>
  );
}

NotAuthorized.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

NotAuthorized.defaultProps = {
  children: null,
};
