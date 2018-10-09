import React from 'react';
import PropTypes from 'prop-types';
import Spinner from 'react-qa/src/glyphs/spinner';
import ErrorMessage from '../../../../common/elments/utils/errorMessage';
import {PangulApiService} from '../../../services/pangulApiService';
import {Answer} from 'react-qa/src/qa/answer';

class AnswerView extends React.Component {
  constructor(props) {
    super(props);
    this.alive = false;
    this.pending = false;
    this.state = {
      error: null,
      loading: true,
      loadedId: null,
      canEdit: false,
      answerId: null,
      loadedAnswerId: null,
    };
  }

  componentDidMount() {
    this.alive = true;
  }

  componentWillUnmount() {
    this.alive = false;
  }

  async _loadDataIfOutDated() {
    if (!this.pending && this.state.loadedAnswerId !== this.state.answerId || this.state.loadedId != this.props.loadedId) {
      try {
        this.pending = true;
        const data = await this.props.api.answers.get(this.state.answerId);
        console.log("FOUND", data);
        if (this.state.answerId === data.answerId) {
          this.pending = false;
          await this.updateState({
            loading: false,
            loadedAnswerId: data.answerId,
            loadedId: this.props.loadedId,
            answer: data,
          });
          console.log("Loaded!");
          this.props.onLoaded(data);
        }
      }
      catch (error) {
        this.pending = false;
        console.log("Unable to display error", error);
        await this.updateState({
          answerId: null,
          loadedAnswerId: null,
          loading: false,
          error: error,
        });
      }
    }
  }

  static getDerivedStateFromProps(props, state) {
    if (state.answerId !== props.answerId && !state.error) {
      return {answerId: props.answerId};
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
        <ErrorMessage>Error loading answer</ErrorMessage>
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

  renderAnswer() {
    if (this.state.loading || this.state.error) return '';
    return (
        <div className="answer">
          <Answer answerId={this.state.answer.answerId}
                  loadedId={this.props.loadedId}
                  body={this.state.answer.body}
          />
        </div>
    );
  }

  render() {
    this._loadDataIfOutDated();
    return (
        <div className="component--AnswerView">
          {this.renderError()}
          {this.renderLoading()}
          {this.renderAnswer()}
        </div>
    );
  }
}

AnswerView.propTypes = {
  api: PropTypes.instanceOf(PangulApiService).isRequired,
  answerId: PropTypes.string.isRequired,
  loadedId: PropTypes.string.isRequired,
  onLoaded: PropTypes.func
};

AnswerView.defaultProps = {
  onLoaded: () => {console.log("AnswerView default");}
};

export default AnswerView;