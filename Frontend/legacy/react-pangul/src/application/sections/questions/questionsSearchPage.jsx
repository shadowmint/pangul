import React from 'react';
import PropTypes from 'prop-types';
import QuestionSearch from '../../elements/questions/questionSearch';
import { UserContext } from '../../../common/contexts/userContext';
import PangulContext from '../../pangulContext';

const QuestionsSearchPage = props => (
  <div className="component--QuestionsSearchPage">
    <PangulContext.Consumer>
      {context => (
          <QuestionSearch api={context.api} />
      )}
    </PangulContext.Consumer>
  </div>
);

export default QuestionsSearchPage;
