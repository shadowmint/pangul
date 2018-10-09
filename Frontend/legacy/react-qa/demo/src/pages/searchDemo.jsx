import React from 'react';
import LiveSearch from '../../../src/search/liveSearch';

const resultFactory = instance => (
    <div>Hello! {instance.value}</div>
);

const randomResults = query => new Promise((resolve, reject) => {
  if (Math.random() < 0.3 || query === 'error') {
    reject(new Error('Fake error message here'));
  } else {
    setTimeout(() => resolve([
      {id: 1, value: query},
      {id: 2, value: 'hii2'},
      {id: 3, value: 'hii3'},
    ]), 500 + Math.random() * 2000);
  }
});

export default class SearchDemo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.searchHandler = {};
  }

  render() {
    return (
        <div>
          <div className="example">
            <LiveSearch
                onQuery={randomResults}
                renderSuggestion={resultFactory}
            />
          </div>
        </div>
    );
  }
}
