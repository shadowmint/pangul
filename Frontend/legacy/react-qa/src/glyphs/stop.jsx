import React from 'react';
import PropTypes from 'prop-types';
import './stop.scss';

export default function Stop(props) {
  return (
    <div className="component--Glyph--Stop" style={{ width: props.size, height: props.size }}>
      <div className="lds-ring" style={{ width: props.size, height: props.size }}>
        <div style={{ width: props.size, height: props.size }} />
        <div style={{ width: props.size, height: props.size }} />
        <div style={{ width: props.size, height: props.size }} />
        <div style={{ width: props.size, height: props.size }} />
      </div>
    </div>
  );
}

Stop.defaultProps = {
  size: 32,
};

Stop.propTypes = {
  // Spinner size, to override default
  size: PropTypes.number,
};
