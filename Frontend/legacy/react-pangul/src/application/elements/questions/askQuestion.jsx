import React from 'react';
import PropTypes from 'prop-types';
import { UserContext } from '../../../common/contexts/userContext';
import PangulQuestionService from '../../services/pangulQuestionService';
import PangulTagService from '../../services/pangulTagService';
import Spinner from 'react-qa/src/glyphs/spinner';
import  Question  from 'react-qa/src/qa/questionView';
import './askQuestion.scss';
import ErrorMessage from '../../../common/elments/utils/errorMessage';
import { PangulNavService } from '../../services/pangulNavService';

class AskQuestion extends React.Component {
  constructor(props) {
    super(props);
    this.questionService = new PangulQuestionService(this.props.userContext.api);
    this.tagsService = new PangulTagService(this.props.userContext.api);
    this.nav = new PangulNavService();
    this.alive = false;
    this.state = {
      error: null,
      loading: true,
      question: null,
    };
    this.tagHandler = {
      onTagClicked: tag => alert(tag),
      onTagSuggest: partial => Promise.resolve([partial, 'hello', 'world']),
    };
    this.events = {
      onAskQuestion: () => this.askQuestion(),
      onQuestionChanged: q =>{
        this.update({ question: q });
      } ,
    };
  }

  componentDidMount() {
    this.alive = true;
    this.loadQuestion();
  }

  componentWillUnmount() {
    this.alive = false;
  }

  async askQuestion() {
    try {
      await this.update({ loading: true, error: null });
      const questionId = await this.questionService.askQuestion(this.state.question);
      this.nav.navigate(this.nav.questionById(questionId));
    } catch (error) {
      await this.update({ loading: false, error });
    }
  }

  async loadQuestion() {
    const question = this.questionService.makeEmptyQuestion();
    this.update({ loading: false, question });
  }

  update(state) {
    if (!this.alive) return Promise.reject(new Error('Component is no longer mounted'));
    return new Promise((resolve) => {
      this.setState(state, resolve);
    });
  }

  renderContent() {
    if (this.state.loading) return '';
    return (
      <div className="component--AskQuestion">
        <Question
          questionId=""
          title={this.state.question.title}
          body={this.state.question.body}
          tags={this.state.question.tags}
          tagHandler={this.tagHandler}
          onChange={this.events.onQuestionChanged}
          edit
        />
        {this.renderError()}
        {this.renderTools()}
      </div>
    );
  }

  renderTools() {
    return (
      <div className="questionTools">
        <button className="primaryAction" onClick={this.events.onAskQuestion}>Ask Question</button>
      </div>
    );
  }

  renderError() {
    if (this.state.error == null) return '';
    return (
      <ErrorMessage>
        <b>Failed to save question</b>
        <div>
          {this.state.error.message}
        </div>
      </ErrorMessage>
    );
  }

  renderLoading() {
    if (!this.state.loading) return '';
    return (
      <div className="loading">
        <Spinner size={16} />
      </div>
    );
  }

  render() {
    return (
      <div className="component--AskQuestion">
        {this.renderLoading()}
        {this.renderContent()}
      </div>
    );
  }
}

AskQuestion.propTypes = {
  userContext: PropTypes.instanceOf(UserContext).isRequired,
};

export default AskQuestion;
