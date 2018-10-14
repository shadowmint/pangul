import React from 'react';
import PropTypes from 'prop-types';
import * as Showdown from 'showdown';
import ReactMde, {DraftUtil} from 'react-mde';
import {TagEditor} from './tagEditor';
import 'react-mde/lib/styles/scss/react-mde-all.scss';
import './question.scss';

export default class QuestionEdit extends React.Component {
  constructor(props) {
    super(props);
    this.converter = new Showdown.Converter({tables: false, simplifiedAutoLink: true});
    this.state = QuestionEdit.getDerivedStateFromProps(props, {});
    this.events = {
      onChangeBody: e => this.onChangeBody(e),
      onChangeTitle: e => this.onChangeTitle(e),
      onChangeTags: tags => this.onChangeTags(tags),
    };
  }

  onChangeTags(tags) {
    this.setState({tags}, () => this.questionChanged());
  }

  onChangeBody(mdeState) {
    const prevValue = this.state.mdeState.markdown;
    this.setState({mdeState}, () => {
      if (mdeState.markdown !== prevValue) {
        this.questionChanged();
      }
    });
  }

  onChangeTitle(event) {
    this.setState({title: event.target.value}, () => this.questionChanged());
  }

  static getDerivedStateFromProps(newProps, state) {
    const props = newProps || {};
    if (state.id !== props.questionId || state.uid !== props.uid) {
      return {
        uid: props.uid,
        id: props.questionId,
        title: props.title,
        tags: props.tags,
        mdeState: state.mdeState || { markdown: props.body },
      };
    }
    return state;
  }

  questionChanged() {
    const viewModel = {
      title: this.state.title,
      tags: this.state.tags.map(i => i),
      body: this.state.mdeState.markdown,
    };
    if (this.props.onChange) {
      this.props.onChange(viewModel);
    }
  }

  render() {
    const htmlRender = markdown => Promise.resolve(this.converter.makeHtml(markdown));
    return (
        <React.Fragment>
          <div className="component--QuestionEdit">
            <div className="edit">
              <div className="title">
                <input
                    value={this.state.title}
                    onChange={this.events.onChangeTitle}
                    disabled={this.props.disabled}
                />
              </div>
              <div className="mde" style={{height: this.props.height}}>
                <ReactMde
                    onChange={this.events.onChangeBody}
                    editorState={this.state.mdeState}
                    layout="tabbed"
                    generateMarkdownPreview={htmlRender}
                    readOnly={this.props.disabled}
                />
              </div>
              <TagEditor
                  tags={this.state.tags}
                  onSuggestTags={this.props.tagHandler.onTagSuggest}
                  onChangeTags={this.events.onChangeTags}
                  disabled={this.props.disabled}
              />
            </div>
          </div>
        </React.Fragment>
    );
  }
}

QuestionEdit.propTypes = {
  // The id of this question
  questionId: PropTypes.string,

  // What is the raw title of this question?
  title: PropTypes.string.isRequired,

  // What is the raw markdown for this question?
  body: PropTypes.string.isRequired,

  // What are the value for this question?
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,

  // Allows the editor height to be set explicitly
  height: PropTypes.string,

  // Invoked when the question props changes at all
  onChange: PropTypes.func,

  // Is this editor in read-only mode?
  disabled: PropTypes.bool,

  // Tag interactions handler
  tagHandler: PropTypes.shape({
    onTagClicked: PropTypes.func.isRequired,
    onTagSuggest: PropTypes.func.isRequired,
  }).isRequired,
};

QuestionEdit.defaultProps = {
  questionId: '',
  onChange: null,
  disabled: false,
  height: 'calc(100% - 6em)',
};
