import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {TopicHomePageTest} from 'react-pangul-app/lib/pages/topics/topicHome/topicHomeTest';

class App extends Component {
  render() {
    return (
      <div className="App">
          <TopicHomePageTest/>
      </div>
    );
  }
}

export default App;
