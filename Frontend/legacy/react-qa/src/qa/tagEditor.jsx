import React from 'react';
import PropTypes from 'prop-types';
import './tagEditor.scss';
import { TagList } from './tagList';
import Autocomplete from 'react-autocomplete';

export class TagEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      suggestions: [],
      canAddTag: false,
    };
    this.events = {
      onClickTag: this.noOp,
      onRemoveTag: tag => this.onRemoveTag(tag),
      onUpdatePartialValue: e => this.onUpdatePartialValue(e),
      onSelectedSuggestion: e => this.onSelectedSuggestion(e),
    };
  }

  noOp() {
  }

  onRemoveTag(tag) {
    const newTags = this.props.tags.filter(i => i.toLocaleLowerCase() !== tag.toLocaleLowerCase());
    this.props.onChangeTags(newTags);
  }

  onUpdatePartialValue(event) {
    this.setState({ value: event.target.value });
    this.props.onSuggestTags(event.target.value).then((suggestions) => {
      this.setState({
        suggestions,
      });
    });
  }

  onSelectedSuggestion(value) {
    const canAdd = this.props.tags.find(i => i.toLocaleLowerCase() === value.toLocaleLowerCase()) == null;
    if (canAdd) {
      const tags = this.props.tags.slice(0);
      tags.push(value);
      this.props.onChangeTags(tags);
    }
    this.setState({
      value: '',
      suggestions: [],
    });
  }

  render() {
    return (
      <div className="component--TagEditor">
        {this.props.disabled ? '' : (
          <div className="editor">
            <Autocomplete
              wrapperStyle={{}}
              items={this.state.suggestions}
              shouldItemRender={() => true}
              getItemValue={item => item}
              renderItem={TagEditor.renderDropdownItem}
              value={this.state.value}
              onChange={this.events.onUpdatePartialValue}
              onSelect={this.events.onSelectedSuggestion}
            />
          </div>
      )}
        <TagList
          tags={this.props.tags}
          edit={!this.props.disabled}
          onClickTag={this.events.onClickTag}
          onRemoveTag={this.events.onRemoveTag}
        />
      </div>
    );
  }

  static renderDropdownItem(item, highlighted) {
    const classes = ['suggestion'];
    if (highlighted) {
      classes.push('selected');
    }
    return (
      <div className={classes.join(' ')} key={item}>
        {item}
      </div>
    );
  }
}

TagEditor.propTypes = {
  // An array of tags as strings
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,

  // Get suggestions for partial tag input
  onSuggestTags: PropTypes.func.isRequired,

  // Update the list of tags bound to this instance
  onChangeTags: PropTypes.func.isRequired,

  // Is this editor in read-only mode?
  disabled: PropTypes.bool,
};
