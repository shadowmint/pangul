import React from 'react';
import PropTypes from 'prop-types';
import Spinner from 'react-qa/src/glyphs/spinner';
import Question from 'react-qa/src/qa/questionView';
import ErrorMessage from '../../../common/elments/utils/errorMessage';
import {PangulApiService} from '../../services/pangulApiService';
import './questionViewEdit.scss';

class QuestionViewEdit extends React.Component {
  constructor(props) {
    super(props);
    this.alive = false;
    this.pending = false;
    this.state = {
      error: null,
      loading: true,
      canEdit: false,
      questionId: null,
      loadedQuestionId: null,
    };
    this.tagHandler = {
      onTagClicked: tag => alert(tag),
      onTagSuggest: partial => Promise.resolve([partial, 'hello', 'world']),
    };
  }

  componentDidMount() {
    this.alive = true;
  }

  componentWillUnmount() {
    this.alive = false;
  }

  async _loadDataIfOutDated() {
    if (!this.pending && this.state.loadedQuestionId !== this.state.questionId) {
      try {
        this.pending = true;
        const data = await this.props.api.questions.getQuestion(this.state.questionId);
        if (this.state.questionId === data.questionId) {
          this.pending = false;
          await this.updateState({
            loading: false,
            loadedQuestionId: data.questionId,
            question: data,
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

  renderError() {
    if (!this.state.error) return '';
    return (
        <ErrorMessage>Error loading question</ErrorMessage>
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
        <div className="question">
          <Question questionId={this.state.question.questionId}
                    title={this.state.question.title}
                    body={this.state.question.body}
                    tags={this.state.question.tags}
                    tagHandler={this.tagHandler}/>
        </div>
    );
  }

  render() {
    this._loadDataIfOutDated();
    return (
        <div className="component--QuestionViewEdit">
          {this.renderError()}
          {this.renderLoading()}
          {this.renderQuestion()}
        </div>
    );
  }
}

QuestionViewEdit.propTypes = {
  api: PropTypes.instanceOf(PangulApiService).isRequired,
  questionId: PropTypes.string.isRequired,
};

export default QuestionViewEdit;
