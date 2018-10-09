import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import QuestionsSearchPage from './questionsSearchPage';
import QuestionsDetailPage from './questionsDetailPage';

const QuestionsSection = props => (
  <React.Fragment>
    <Route exact path={`${props.match.url}/:questionId`} render={() => <QuestionsDetailPage {...props} />} />
    <Route exact path={`${props.match.url}/:questionId/:tag`} render={() => <QuestionsDetailPage {...props} />} />
    <Route exact path={`${props.match.url}/`} render={() => <QuestionsSearchPage {...props} />} />
  </React.Fragment>
);

QuestionsSection.propTypes = {
  match: PropTypes.shape({
    url: PropTypes.string.isRequired,
  }).isRequired,
};

export default QuestionsSection;
