import React from 'react';
import PropTypes from 'prop-types';
import './modal.scss';

export default function Modal(props) {
  return (
    <div className="component--Modal">
      <div>
        {props.children}
      </div>
    </div>
  );
}

Modal.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

Modal.defaultProps = {
  children: null,
};
