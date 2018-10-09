import React from 'react';
import PropTypes from 'prop-types';
import LiveSearch from 'react-qa/src/search/liveSearch';
import PangulQuestionService from '../../services/pangulQuestionService';
import {PangulApiService} from '../../services/pangulApiService';
import './questionSearch.scss';
import {PangulNavService} from '../../services/pangulNavService';
import {Link} from 'react-router-dom';
import {TagList} from 'react-qa/src/qa/tagList';

const navService = new PangulNavService();

const resultFactory = instance => (
    <div key={instance.questionId}>
      <div className='votes'>
        {instance.total}
        </div>
      <div className='link'>
        <Link to={navService.questionById(instance.questionId, instance.title)}>{instance.title}</Link>
      </div>
      <div className='tags'>
        <TagList edit={false} tags={instance.tags} onClickTag={() => { console.log('TODO')}}/>
        </div>
    </div>
);

class QuestionSearch extends React.Component {
  constructor(props) {
    super(props);

    const params = new PangulNavService().params();
    const initalQuery = params.get('q');

    this.state = {
      query: initalQuery,
    };

    this.events = {
      search: query => this.searchForResults(query),
    };
  }

  async searchForResults(query) {
    await this.updateState({query});
    if (query) {
      new PangulNavService().setParams({q: query});
    }
    else {
      new PangulNavService().setParams({});
    }

    const serivce = new PangulQuestionService(this.props.api);
    return serivce.searchForQuestions(query);
  }

  render() {
    return (
        <div className="component--QuestionSearch">
          <LiveSearch
              value={this.state.query}
              onQuery={this.events.search}
              renderSuggestion={resultFactory}
          />
        </div>
    );
  }

  updateState(state) {
    return new Promise((resolve) => {
      this.setState(state, () => resolve());
    });
  }
}

QuestionSearch.propTypes = {
  api: PropTypes.instanceOf(PangulApiService).isRequired,
};

export default QuestionSearch;
