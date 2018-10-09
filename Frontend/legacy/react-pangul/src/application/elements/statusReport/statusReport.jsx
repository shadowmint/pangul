import React from 'react';
import PropTypes from 'prop-types';
import Spinner from 'react-qa/src/glyphs/spinner';
import './statusReport.scss';

class StatusReport extends React.Component {
  constructor(props) {
    super(props);
    this.alive = false;
    this.state = {
      task: props.task,
      loading: true,
      content: null,
    };
  }

  componentDidMount() {
    this.alive = true;
    this.executeFetchTask();
  }

  componentDidUpdate() {
    if (this.state.content === null && !this.state.loading) {
      this.executeFetchTask();
    }
  }

  componentWillUnmount() {
    this.alive = false;
  }

  executeFetchTask() {
    if (this.state.task) {
      this.state.task().then((result) => {
        if (this.alive) {
          this.setState({
            content: result,
            loading: false,
          });
        }
      }, (err) => {
        if (this.alive) {
          this.setState({
            content: { error: err.message },
            loading: false,
          });
        }
      });
    } else {
      this.setState({
        content: { error: 'Invalid or missing task' },
        loading: false,
      });
    }
  }

  renderContent() {
    if (this.state.loading) return '';
    const fullRenderedState = this.state.content ? JSON.stringify(this.state.content, null, 2) : '';
    return (
      <pre>
        {fullRenderedState}
      </pre>
    );
  }

  renderLoading() {
    if (!this.state.loading) return '';
    return (
      <div className="loading">
        <Spinner size={16} />
      </div>
    );
  }

  render() {
    return (
      <div className="component--StatusReport">
        {this.renderLoading()}
        {this.renderContent()}
      </div>
    );
  }
}

StatusReport.propTypes = {
  task: PropTypes.func.isRequired,
};

export default StatusReport;