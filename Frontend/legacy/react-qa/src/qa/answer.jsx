import React from 'react';
import PropTypes from 'prop-types';
import * as Showdown from 'showdown';
import ReactMde from 'react-mde';
import './answer.scss';

export class Answer extends React.Component {
  constructor(props) {
    super(props);
    this.converter = new Showdown.Converter({ tables: false, simplifiedAutoLink: true });
    this.state = {
      answerId: null,
      loadedId: null,
      mdeState: {
        markdown: '',
      },
    };
    this.events = {
      onChangeBody: e => this.onChangeBody(e),
    };
  }

  onChangeBody(mdeState) {
    this.setState({ mdeState });
    this.props.onChange({
      body: this.state.mdeState.markdown,
      answerId: this.state.answerId,
    });
  }

  static getDerivedStateFromProps(p, state) {
    const props = p || {};
    if ((props.answerId && (!state.answerId || props.answerId !== state.answerId)) ||
        (props.loadedId && (!state.loadedId || props.loadedId !== state.loadedId))) {
      return {
        answerId: props.answerId,
        loadedId: props.loadedId,
        mdeState: {
          markdown: props.body,
        },
      };
    }
    return null;
  }

  renderEdit() {
    return (
      <div className="edit">
        <div className="mde">
          <ReactMde
            onChange={this.events.onChangeBody}
            editorState={this.state.mdeState}
            layout="tabbed"
            generateMarkdownPreview={markdown => Promise.resolve(this.converter.makeHtml(markdown))}
          />
        </div>
      </div>
    );
  }

  renderView() {
    const rendered = this.converter.makeHtml(this.props.body);
    return (
      <div data-id={this.props.answerId}>
        <div dangerouslySetInnerHTML={{ __html: rendered }} />
      </div>
    );
  }

  render() {
    return (
      <React.Fragment>
        <div className="component--Answer" data-id={this.state.answerId || ''} data-loaded={this.state.loadedId || ''}>
          {this.props.edit ? this.renderEdit() : ''}
          {this.props.edit ? '' : this.renderView()}
        </div>
      </React.Fragment>
    );
  }
}

Answer.propTypes = {
  // What is the id of the answer?
  answerId: PropTypes.string.isRequired,

  // The unique id of the loaded instance from the parent
  // ie. Reset this to reload the props
  loadedId: PropTypes.string.isRequired,

  // Is this question in edit mode?
  edit: PropTypes.bool,

  // What is the raw markdown for this question?
  body: PropTypes.string.isRequired,

  // Invoked with the props when it updates
  onChange: PropTypes.func,
};

Answer.defaultProps = {
  edit: false,
  onChange: () => {
  },
};
