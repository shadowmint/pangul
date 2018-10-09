import React from 'react';
import PropTypes from 'prop-types';
import './spinner.scss';

export default function Spinner(props) {
  return (
    <div className="component--Glyph--Spinner" style={{ width: props.size, height: props.size }}>
      <div className="lds-ring" style={{ width: props.size, height: props.size }}>
        <div style={{ width: props.size, height: props.size }} />
        <div style={{ width: props.size, height: props.size }} />
        <div style={{ width: props.size, height: props.size }} />
        <div style={{ width: props.size, height: props.size }} />
      </div>
    </div>
  );
}

Spinner.defaultProps = {
  size: 32,
};

Spinner.propTypes = {
  // Spinner size, to override default
  size: PropTypes.number,
};
