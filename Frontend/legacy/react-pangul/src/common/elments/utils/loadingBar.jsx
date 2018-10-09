import React from 'react';
import PropTypes from 'prop-types';
import Spinner from 'react-qa/src/glyphs/spinner';
import './loadingBar.scss';

const LoadingBar = props => {
  return (
      <div className="component--LoadingBar">
        <span>{props.message}</span>
        <Spinner size={16} />
      </div>
  );
};

LoadingBar.propTypes = {
  message: PropTypes.string.isRequired
};

export default LoadingBar;
