import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import ProfileHome from './profileHome';

const ProfileSection = props => (
  <React.Fragment>
    <Route exact path={`${props.match.url}/`} render={() => <ProfileHome {...props} />}/>
  </React.Fragment>
);

ProfileSection.propTypes = {
  match: PropTypes.shape({
    url: PropTypes.string.isRequired,
  }).isRequired,
};

export default ProfileSection;
