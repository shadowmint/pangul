import React from 'react';
import PropTypes from 'prop-types';

export function managedResource(defaultState, WrappedResource) {
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.props = {
        state: defaultState,
        lastUpdate: new Date(),
        model: props.model,
        events: {
          onChangeState: (s) => this._setRenderedState(s),
          onChangeModel: (model) => this._setModel(model),
        },
      };
    }

    _setModel(model) {
      this.setState({model, lastUpdate: new Date()});
    }

    _setRenderedState(state) {
      this.setState({state, lastUpdate: new Date()});
    }

    render() {
      if (!this.state.model) return '';
      return <WrappedResource {...this.props}
                              state={this.state.state}
                              lastUpdate={this.state.lastUpdate}
                              events={this.state.events}
                              model={this.state.model}/>;
    }
  };
}

export const ResourceState = (props) => (
    <React.Fragment key={props.key}>
    </React.Fragment>
);

ResourceState.propTypes = {
  // The name of this props
  name: PropTypes.string.isRequired,

  // The rendered output for this props, taking the model as an input
  // (identity, model) => (<div key={identity}> ... </div>)
  render: PropTypes.func.isRequired,
};

export const Resource = (props) => {
  const children = React.Children.map(props.children, child => child, null) || [];
  const active = children.find(i => i.props.name === props.state);
  return (
      <React.Fragment>
        {console.log(props)}
        {active.props.render(props.model, props.events)}
      </React.Fragment>
  );
};

Resource.propTypes = {
  // The current props of the object
  state: PropTypes.string.isRequired,

  // The model data to pass to each props
  model: PropTypes.object.isRequired,

  // The set of states this resource can be rendered in
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

Resource.defaultProps = {
  children: null,
};