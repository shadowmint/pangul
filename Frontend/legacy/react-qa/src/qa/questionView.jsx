import React from 'react';
import PropTypes from 'prop-types';
import * as Showdown from 'showdown';
import { TagList } from './tagList';
import './question.scss';

export default class QuestionView extends React.Component {
  constructor(props) {
    super(props);
    this.converter = new Showdown.Converter({ tables: false, simplifiedAutoLink: true });
    this.events = {
      onClickTag: tag => this.onClickTag(tag),
    };
  }

  onClickTag(tag) {
    if (this.props.tagHandler && this.props.tagHandler.onTagClicked) {
      try {
        this.props.tagHandler.onTagClicked(tag);
      } catch (error) {
        // Consume silently.
      }
    }
  }

  render() {
    const rendered = this.converter.makeHtml(this.props.body);
    return (
      <React.Fragment>
        <div data-id={this.props.questionId} className="component--QuestionView">
          <h1>{this.props.title}</h1>
          <div dangerouslySetInnerHTML={{ __html: rendered }} />
          <TagList tags={this.props.tags} onClickTag={this.events.onClickTag} />
        </div>
      </React.Fragment>
    );
  }
}

QuestionView.propTypes = {
  // The id of this answer
  questionId: PropTypes.string,

  // What is the raw title of this AnswerView?
  title: PropTypes.string.isRequired,

  // What is the raw markdown for this answer?
  body: PropTypes.string.isRequired,

  // What are the value for this answer?
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,

  // Tag interactions handler
  tagHandler: PropTypes.shape({
    onTagClicked: PropTypes.func.isRequired,
    onTagSuggest: PropTypes.func.isRequired,
  }).isRequired,
};

QuestionView.defaultProps = {
  questionId: '',
};