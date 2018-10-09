import React from 'react';
import PropTypes from 'prop-types';
import PangulQuestionService from '../../../services/pangulQuestionService';
import Spinner from 'react-qa/src/glyphs/spinner';
import ErrorMessage from '../../../../common/elments/utils/errorMessage';
import {PangulApiService} from '../../../services/pangulApiService';
import AnswerViewEdit from './answerViewEdit';

class AnswerListForQuestion extends React.Component {
  constructor(props) {
    super(props);
    this.pending = false;
    this.alive = false;
    this.state = {
      error: null,
      loading: true,
      canEdit: false,
      questionId: null,
      loadedQuestionId: null,
      lastUpdate: null,
      answers: [],
    };
  }

  componentDidMount() {
    this.alive = true;
  }

  componentWillUnmount() {
    this.alive = false;
  }

  _loadDataIfOutDated() {
    setTimeout(async () => {
      if (this._isOutDated()) {
        this.pending = true;
        try {
          const data = await this.service().searchForAnswersByQuestion(this.state.questionId);
          console.log('GOT DATA', data);
          if (this.state.questionId === data.questionId) {
            this.pending = false;
            await this.updateState({
              loading: false,
              loadedQuestionId: data.questionId,
              lastUpdate: this.props.updated,
              answers: data.answerIds,
            });
          }
        }
        catch (error) {
          this.pending = false;
          await this.updateState({
            questionId: null,
            loadedQuestionId: null,
            loading: false,
            error: error,
          });
        }
      }
    }, 1);
  }
  
  _isOutDated() {
    if (this.pending) return false;
    if (this.state.loadedQuestionId !== this.state.questionId) return true;
    if (this.state.lastUpdate !== this.props.updated) return true;
    return false;
  }

  static getDerivedStateFromProps(props, state) {
    if (state.questionId !== props.questionId && !state.error) {
      return {questionId: props.questionId};
    }
    return null;
  }

  updateState(state) {
    if (!this.alive) return Promise.reject(new Error('Component is no longer mounted'));
    return new Promise((resolve) => {
      this.setState(state, resolve);
    });
  }

  renderAnswer(id) {
    return (
        <div key={id}>
          <AnswerViewEdit api={this.props.api} answerId={id}/>
        </div>
    );
  }

  renderError() {
    if (!this.state.error) return '';
    return (
        <ErrorMessage>Error loading answers for question</ErrorMessage>
    );
  }

  renderLoading() {
    if (this.state.error || !this.state.loading) return '';
    return (
        <div className="loading">
          <Spinner size={16}/>
        </div>
    );
  }

  renderQuestion() {
    if (this.state.loading || this.state.error) return '';
    return (
        <React.Fragment>
          {this.state.answers.map(i => this.renderAnswer(i))}
        </React.Fragment>
    );
  }

  render() {
    this._loadDataIfOutDated();
    return (
        <div className="component--AnswerList">
          {this.renderError()}
          {this.renderLoading()}
          {this.renderQuestion()}
        </div>
    );
  }

  service() {
    return new PangulQuestionService(this.props.api);
  }
}

AnswerListForQuestion.propTypes = {
  api: PropTypes.instanceOf(PangulApiService).isRequired,
  questionId: PropTypes.string.isRequired,
  updated: PropTypes.string.isRequired,
};

export default AnswerListForQuestion;
