import React from 'react';
import PropTypes from 'prop-types';
import Spinner from '../glyphs/spinner';
import Stop from '../glyphs/stop';
import './liveSearch.scss';
import Debounce from '../common/debounce';
import RequestStream from '../common/requestStream';

export default class LiveSearch extends React.Component {
  constructor(props) {
    super(props);
    this.changes = new RequestStream(new Debounce(100), (error) => {
      this.setState({ error });
    });
    this.state = {
      error: null,
      suggestions: [],
      loading: false,
      initial: null,
      query: '',
    };
    this.events = {
      onQueryChanged: e => this.onQueryChanged(e),
      onStop: e => this.onStopRequests(e),
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (state.initial === null) {
      return { query: props.value || '' };
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.initial === null) {
      setTimeout(() => {
        this.setState({ initial: this.state.query }, () => {
          this.onQueryChanged();
        });
      }, 1);
    }
  }

  async onQueryChanged(e) {
    if (e) {
      await this.updateState({
        query: e.target.value,
        error: null,
      });
    }

    this.changes.task(
      () => {
        this.setState({
          loading: true,
        });
        return this.props.onQuery(this.state.query);
      },
      (suggestions) => {
        this.setState({
          suggestions,
          loading: false,
        });
      },
      (error, wasCancelled) => {
        if (!wasCancelled) {
          this.setState({ error, loading: false });
        }
      },
    );
  }

  onStopRequests(e) {
    e.preventDefault();
    this.changes.cancel();
    this.setState({ loading: false });
    return false;
  }

  updateState(state) {
    return new Promise((resolve) => {
      this.setState(state, () => resolve());
    });
  }

  renderResult(item) {
    return (
      <SearchResult key={item.id}>
        {this.props.renderSuggestion(item)}
      </SearchResult>
    );
  }

  render() {
    return (
      <div className="component--LiveSearch">
        <div>
          <input type="text" value={this.state.query} onChange={this.events.onQueryChanged} />
          {this.state.loading ? <LoadingIndicator onHaltClick={this.events.onStop} /> : ''}
        </div>
        {this.state.error ? <ErrorMessage error={this.state.error} /> : ''}
        <div className="results">
          {(this.state.suggestions || []).map(i => this.renderResult(i))}
        </div>
      </div>
    );
  }
}

LiveSearch.propTypes = {
  // The initial value in the search bar
  value: PropTypes.string,

  // Handle query requests; (q) => Promise<object[]>
  onQuery: PropTypes.func.isRequired,

  // Render the suggestion for a query
  renderSuggestion: PropTypes.func.isRequired,
};

LiveSearch.defaultProps = {
  value: '',
};

function SearchResult(props) {
  return (
    <div className="result">
      {props.children}
    </div>
  );
}

function ErrorMessage(props) {
  return (
    <div className="error">
      Error
      <div>
        {props.error.message}
      </div>
    </div>
  );
}

ErrorMessage.propTypes = {
  // The error message to render
  error: PropTypes.instanceOf(Error).isRequired,
};

function LoadingIndicator(props) {
  return (
    <div className="loading">
      <Spinner size={16} />
      <button onClick={props.onHaltClick} style={{ width: 16, height: 16 }}>
        <Stop size={16} />
      </button>
    </div>
  );
}

LoadingIndicator.propTypes = {
  // A handler to invoke when stop is clicked on
  onHaltClick: PropTypes.func.isRequired,
};

/* Template.propTypes = {
  // You can declare that a prop is a specific JS primitive. By default, these
  // are all optional.
  optionalArray: PropTypes.array,
  optionalBool: PropTypes.bool,
  optionalFunc: PropTypes.func,
  optionalNumber: PropTypes.number,
  optionalObject: PropTypes.object,
  optionalString: PropTypes.string,
  optionalSymbol: PropTypes.symbol,

  // Anything that can be rendered: numbers, strings, elements or an array
  // (or fragment) containing these types.
  optionalNode: PropTypes.node,

  // A React element.
  optionalElement: PropTypes.element,

  // You can also declare that a prop is an instance of a class. This uses
  // JS's instanceof operator.
  optionalMessage: PropTypes.instanceOf(TemplateProp),

  // You can ensure that your prop is limited to specific values by treating
  // it as an enum.
  optionalEnum: PropTypes.oneOf(['News', 'Photos']),

  // An object that could be one of many types
  optionalUnion: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.instanceOf(TemplateProp)
  ]),

  // An array of a certain type
  optionalArrayOf: PropTypes.arrayOf(PropTypes.number),

  // An object with property values of a certain type
  optionalObjectOf: PropTypes.objectOf(PropTypes.number),

  // An object taking on a particular shape
  optionalObjectWithShape: PropTypes.shape({
    color: PropTypes.string,
    fontSize: PropTypes.number
  }),

  // You can chain any of the above with `isRequired` to make sure a warning
  // is shown if the prop isn't provided.
  requiredFunc: PropTypes.func.isRequired,

  // A value of any data type
  requiredAny: PropTypes.any.isRequired,

  // Children
  children: PropTypes.node.isRequired,
}; */
