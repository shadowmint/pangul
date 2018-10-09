import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import AskHome from './askHome';
import { UserContext } from "../../../common/contexts/userContext";

const AskSection = props => (
  <React.Fragment>
    <Route exact path={`${props.match.url}/`} render={() => <AskHome {...props} />} />
  </React.Fragment>
);

AskSection.propTypes = {
  match: PropTypes.shape({
    url: PropTypes.string.isRequired,
  }).isRequired,
};

export default AskSection;
