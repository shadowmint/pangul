import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import HomeHome from './homeHome';

const HomeSection = props => (
  <React.Fragment>
    <Route exact path={`${props.match.url}/`} render={() => <HomeHome {...props} />} />
  </React.Fragment>
);

HomeSection.propTypes = {
  match: PropTypes.shape({
    url: PropTypes.string.isRequired,
  }).isRequired,
};

export default HomeSection;
