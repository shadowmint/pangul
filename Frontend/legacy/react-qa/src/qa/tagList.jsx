import React from 'react';
import PropTypes from 'prop-types';
import "./tagList.scss";

export class TagList extends React.Component {
  constructor(props) {
    super(props);

  }

  onClickTag(event, tag) {
    event.preventDefault();
    try {
      this.props.onClickTag(tag);
    }
    catch (error) {
      // Probably a bad prop
    }
    return false;
  }

  onRemoveTag(event, tag) {
    event.preventDefault();
    try {
      this.props.onRemoveTag(tag);
    }
    catch (error) {
      // Probably a bad prop
    }
    return false;
  }

  render() {
    return <div className="component--TagList">
      {this.props.tags.map(i => this.renderTag(i))}
    </div>;
  }

  renderTag(tag) {
    return <div className="tag" key={`TagList_${tag}`}>
      {this.props.edit ? tag : <a onClick={(ev) => this.onClickTag(ev, tag)}>{tag}</a>}
      {this.props.edit ? <a className="removeTag" onClick={(ev) => this.onRemoveTag(ev, tag)}>x</a> : ""}
    </div>;
  }
}

TagList.propTypes = {
  // An array of value as strings
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,

  // What to do if someone clicks on a tag
  onClickTag: PropTypes.func.isRequired,

  // Is this list in edit mode?
  edit: PropTypes.bool,

  // What to do if a tag is removed
  onRemoveTag: PropTypes.func,
};