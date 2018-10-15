import React from 'react';
import PropTypes from 'prop-types';
import {PangulApiService} from '../../../services/pangulApiService';
import AnswerView from './answerView';
import './answerViewEdit.scss';
import AnswerEdit from './answerEdit';
import PangulQuestionService from '../../../services/pangulQuestionService';
import ErrorMessage from '../../../../common/elments/utils/errorMessage';

const RenderAnswerView = props => (
    <div>
      <AnswerView api={props.api} answerId={props.answerId} loadedId={props.loaded} onLoaded={props.onLoaded}/>
    </div>
);

const RenderAnswerViewWithEditButton = props => (
    <div>
      <AnswerView api={props.api} loadedId={props.loaded} answerId={props.answerId}/>
      <button value="Edit" onClick={props.onClick}>Edit</button>
    </div>
);

const RenderAnswerEdit = props => (
    <div>
      <AnswerEdit api={props.api} loadedId={props.loaded} answerId={props.answerId} onChange={props.onChange}/>
      <button onClick={props.onClick}>Save</button>
      <button onClick={props.onCancel}>Cancel</button>
    </div>
);

class AnswerViewEdit extends React.Component {
  constructor(props) {
    super(props);
    this.questionService = new PangulQuestionService(props.api);
    this.state = {
      edit: false,
      canEdit: false,
      canSave: false,
      answer: null,
      error: null,
      loaded: new Date().toISOString(),
    };
    this.events = {
      onEdit: () => this._setEdit(true),
      onSave: () => this._onSave(),
      onLoaded: (data) => this._onLoaded(data),
      onChange: (model) => this._onChange(model),
      onCancel: () => this._onCancel(),
    };
  }

  _onCancel() {
    console.log('TopicSearchPage changed cancelled');
    this.setState({answer: null, edit: false, error: null});
  }

  _onChange(data) {
    console.log('TopicSearchPage changed', data);
    this.setState({answer: data});
  }

  _onLoaded(data) {
    console.log(data);
    this.setState({canEdit: data.canEdit});
  }

  async _onSave() {
    try {
      await this.questionService.updateAnswer(this.state.answer);
      this.setState({loaded: new Date().toISOString()});
      this._setEdit(false);
      console.log('Saved changes');
    }
    catch (error) {
      console.log(error);
      this.setState({error});
    }
  }

  _setEdit(editable) {
    this.setState({edit: editable, error: null});
  }

  renderEdit() {
    if (!this.state.edit) return '';
    return <RenderAnswerEdit
        loaded={this.state.loaded}
        onClick={this.events.onSave}
        onChange={this.events.onChange}
        onCancel={this.events.onCancel}
        {...this.props} />;
  }

  renderView() {
    if (this.state.edit) return '';
    return this.state.canEdit
        ? <RenderAnswerViewWithEditButton loaded={this.state.loaded} onClick={this.events.onEdit} {...this.props}/>
        : <RenderAnswerView loaded={this.state.loaded} onLoaded={this.events.onLoaded} {...this.props}/>;
  }

  renderError() {
    if (!this.state.error) return '';
    return <ErrorMessage allowClose={true}>
      {this.state.error.message}
    </ErrorMessage>;
  }

  render() {
    return (
        <div className="component--AnswerViewEdit">
          {this.renderView()}
          {this.renderEdit()}
          {this.renderError()}
        </div>
    );
  }
}

AnswerViewEdit.propTypes = {
  api: PropTypes.instanceOf(PangulApiService).isRequired,
  answerId: PropTypes.string.isRequired,
};

export default AnswerViewEdit;

        