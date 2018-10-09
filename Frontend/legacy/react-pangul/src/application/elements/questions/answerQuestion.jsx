import React from 'react';
import PropTypes from 'prop-types';
import PangulQuestionService from '../../services/pangulQuestionService';
import Spinner from 'react-qa/src/glyphs/spinner';
import './answerQuestion.scss';
import ErrorMessage from '../../../common/elments/utils/errorMessage';
import { PangulNavService } from '../../services/pangulNavService';
import {Answer} from 'react-qa/src/qa/answer';
import {PangulApiService} from '../../services/pangulApiService';

class AnswerQuestion extends React.Component {
  constructor(props) {
    super(props);
    this.questionService = new PangulQuestionService(this.props.api);
    this.nav = new PangulNavService();
    this.alive = false;
    this.state = {
      error: null,
      loading: true,
      answer: null,
    };
    this.events = {
      onAnswerQuestion: () => this.answerQuestion(),
      onAnswerChanged: (a) => this.update({answer: a}),
    };
  }

  componentDidMount() {
    this.alive = true;
    this.loadAnswer();
  }

  componentWillUnmount() {
    this.alive = false;
  }

  async answerQuestion() {
    try {
      await this.update({ loading: true, error: null });
      await this.questionService.answerQuestion(this.props.questionId, this.state.answer);
      await this.update({ loading: false, error: null });
      this.props.refresh();
    } catch (error) {
      await this.update({ loading: false, error });
    }
  }

  async loadAnswer() {
    const answer = this.questionService.makeEmptyAnswer();
    await this.update({ loading: false, answer });
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
        <div className="component--AnswerQuestion">
          <Answer
              answerId=""
              loadedId=""
              body={this.state.answer.body}
              onChange={this.events.onAnswerChanged}
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
          <button className="primaryAction" onClick={this.events.onAnswerQuestion}>Answer Question</button>
        </div>
    );
  }

  renderError() {
    if (this.state.error == null) return '';
    return (
        <ErrorMessage>
          <b>Failed to save answer</b>
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
        <div className="component--AnswerQuestion">
          {this.renderLoading()}
          {this.renderContent()}
        </div>
    );
  }
}

AnswerQuestion.propTypes = {
  api: PropTypes.instanceOf(PangulApiService).isRequired,
  questionId: PropTypes.string.isRequired,
  refresh: PropTypes.func.isRequired,
};

export default AnswerQuestion;
