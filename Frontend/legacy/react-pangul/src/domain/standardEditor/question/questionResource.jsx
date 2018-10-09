import React from 'react';
import QuestionView from 'react-qa/src/qa/questionView';
import QuestionEdit from 'react-qa/src/qa/questionEdit';
import LoadingBar from '../../../common/elments/utils/loadingBar';
import ErrorMessage from '../../../common/elments/utils/errorMessage';
import './questionResource.scss';
import {Votes} from 'react-qa/src/qa/votes';
import ModelVoteHandler from '../../standardModelHelpers/modelVoteHandler';

class QuestionResource extends React.Component {
  constructor() {
    super();
    this.state = {
      question: null,
      voteHandler: null,
      backup: null,
      uid: 0,
    };
    this.events = {
      onSave: () => this.onSave(),
      onChange: (delta) => this.onChange(delta),
      onRevert: () => this.onRevert(),
    };
  }

  async onChange(model) {
    if (this.state.backup == null) {
      this.setState({
        backup: JSON.stringify(this.state.question.state),
      });
    }
    await this.state.question.update(() => model);
  }

  async onSave() {
    await this.state.question.save();
    if (!this.state.question.error) {
      this.setState({
        backup: null,
        uid: this.state.uid + 1,
      });
    }
  }

  async onRevert() {
    await this.state.question.update(() => JSON.parse(this.state.backup));
    this.setState({
      backup: null,
      uid: this.state.uid + 1,
    });
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.question !== nextProps.question) {
      return {
        question: nextProps.question,
        voteHandler: new ModelVoteHandler(nextProps.question),
        backup: null,
      };
    }
    return null;
  }

  render() {
    const question = this.state.question;
    return (

        <div className="component--QuestionResource">
          <Votes edit
                 votes={question.state.meta || 0}
                 isStar={question.state.star || false}
                 isUp={question.state.up || false}
                 isDown={question.state.down || false}
                 voteHandler={this.state.voteHandler}
                 dataType='Question'
                 dataId={question.state.questionId || '0'}>
            <QuestionResourceInner loading={question.loading}
                                   uid={this.state.uid}
                                   error={question.error}
                                   questionId={question.state.questionId}
                                   title={question.state.title}
                                   body={question.state.body}
                                   tags={question.state.tags}
                                   modified={question.modified}
                                   onChange={this.events.onChange}
                                   onRevert={this.events.onRevert}
                                   onSave={this.events.onSave}
                                   tagHandler={this.props.tagHandler}/>

          </Votes>
        </div>

    );
  }
}

class QuestionResourceInner extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      loadingMessage: 'loading',
      state: 'view',
    };
    this.events = {
      onChange: (delta) => this.props.onChange(delta),
      onRevert: () => this.onRevert(),
      onEdit: () => this.onEdit(),
      onClose: () => this.onClose(),
      onSave: () => this.onSave(),
      onAbort: () => this.onAbort(),
    };
  }

  onRevert() {
    this.props.onRevert();
    this.setState({
      state: 'view',
    });
  }

  onEdit() {
    this.setState({
      state: 'edit',
    });
  }

  onClose() {
    this.setState({
      state: 'view',
    });
  }

  onSave() {
    this.setState({
      state: 'saving',
    }, () => {
      setTimeout(async () => {
        await this.props.onSave();
        this.setState({
          state: 'edit',
        });
      }, 500);
    });
  }

  onAbort() {
    this.setState({
      state: 'edit',
    });
  }

  render() {
    return (
        <React.Fragment>
          {!this.state.loading ? '' : <LoadingBar message={this.state.loadingMessage}/>}
          {this.props.error ? <ErrorMessage>{this.props.error.message}</ErrorMessage> : ''}
          {this.state.state !== 'view' ? '' : <QuestionResourceView {...this.props} events={this.events}/>}
          {this.state.state !== 'edit' ? '' : <QuestionResourceEdit {...this.props} events={this.events}/>}
          {this.state.state !== 'saving' ? '' : <QuestionResourceSaving {...this.props} events={this.events}/>}
        </React.Fragment>
    );
  }
}

const QuestionResourceView = (props) => {
  return (
      <React.Fragment>
        <QuestionView questionId={props.questionId}
                      title={props.title}
                      body={props.body}
                      tags={props.tags}
                      tagHandler={props.tagHandler}/>
        <div className='buttonBar'>
          <button className='primaryAction' onClick={props.events.onEdit}>Edit</button>
        </div>
      </React.Fragment>
  );
};

const QuestionResourceEdit = (props) => {
  return (
      <React.Fragment>
        {props.modified ? <div className="unsaved">unsaved changes</div> : ''}
        <QuestionEdit uid={props.uid}
                      questionId={props.questionId}
                      title={props.title}
                      body={props.body}
                      tags={props.tags}
                      tagHandler={props.tagHandler}
                      height="30em"
                      onChange={(delta) => props.events.onChange(delta)}/>
        <div className='buttonBar'>
          {props.modified ? '' : <button className='primaryAction' onClick={props.events.onClose}>Close</button>}
          {!props.modified ? '' : <button className='primaryAction' onClick={props.events.onRevert}>Revert</button>}
          {!props.modified ? '' : <button className='primaryAction' onClick={props.events.onSave}>Save</button>}
        </div>
      </React.Fragment>
  );
};

const QuestionResourceSaving = (props) => {
  return (
      <React.Fragment>
        <LoadingBar message='Saving changes'/>
        <QuestionEdit uid={props.uid}
                      questionId={props.questionId}
                      title={props.title}
                      body={props.body}
                      tags={props.tags}
                      tagHandler={props.tagHandler}
                      onChange={null}
                      height="30em"
                      disabled/>
        <div className='buttonBar'>
          <button className='primaryAction' onClick={props.events.onAbort}>Cancel</button>
        </div>
      </React.Fragment>
  );
};

export default QuestionResource;