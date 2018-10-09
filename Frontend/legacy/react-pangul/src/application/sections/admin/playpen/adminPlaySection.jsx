import React from 'react';
import PropTypes from 'prop-types';
import {Route} from 'react-router-dom';
import AdminPlayExperimentsPage from './adminPlayExperimentsPage';
import AdminPlayComponentTemplatePage from './adminPlayComponentsTemplatePage';

const AdminPlaySection = (props) => (
    <React.Fragment>

      {/* Experiments and play area */}
      <Route exact path={`${props.match.url}/`} component={AdminPlayExperimentsPage}/>

      {/* Tests */}
      <Route exact path={`${props.match.url}/template`} component={AdminPlayComponentTemplatePage}/>

    </React.Fragment>
);

AdminPlaySection.propTypes = {
  match: PropTypes.shape({
    url: PropTypes.string.isRequired,
  }).isRequired,
};

export default AdminPlaySection;
