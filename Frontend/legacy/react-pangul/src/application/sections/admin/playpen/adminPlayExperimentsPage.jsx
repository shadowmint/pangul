import React from 'react';
import './adminPlaypen.scss';

import AdminPlayNav from './common/adminPlayNav';
import Stateful from 'react-model/src/stateful';
import Question from '../../../../domain/models/question';
import QuestionResource from '../../../../domain/standardEditor/question/questionResource';
import LoadingBar from '../../../../common/elments/utils/loadingBar';
import asyncTimeout from '../../../../common/utils/asyncTimeout';

const tagHandler = {
  onTagClicked: (tag) => alert(tag),
  onTagSuggest: (partial) => {
    return Promise.resolve([partial, 'hello', 'world']);
  },
};

class PageModel extends Stateful {
  constructor() {
    super({
      loaded: false,
      question: new Question(),
      question2: new Question(),
      answers: [],
    });
    this.loadInitialData();
  }

  async loadInitialData() {
    this.props.question.reparent(this);
    this.props.question2.reparent(this);
    await this.props.question2.get(2);
    await asyncTimeout(500);
    await this.update(() => {
      return {
        loaded: true,
      };
    });
  }
}

class AdminPlayExperimentsPage extends React.Component {
  constructor() {
    super();
    this.state = {
      model: new PageModel(),
    };
    this.state.model.watch(async () => {
      this.forceUpdate();
    });
  }

  renderLoading() {
    if (this.state.model.props.loaded) {
      return '';
    }
    return (
        <React.Fragment>
          <LoadingBar message="loading..."/>
        </React.Fragment>
    );
  }

  renderLoaded() {
    if (!this.state.model.props.loaded) {
      return '';
    }
    console.log('Render loaded');
    const question = this.state.model.props.question;
    const question2 = this.state.model.props.question2;
    return (
        <React.Fragment>
          <QuestionResource question={question}
                            tagHandler={tagHandler}/>

          <QuestionResource question={question2}
                            tagHandler={tagHandler}/>
        </React.Fragment>
    );
  }

  render() {
    console.log('Redraw', this.state.model.props.loaded);
    return (
        <div className="component--AdminPlayExperimentsPage">
          <h1>Playpen: Experiments</h1>
          <AdminPlayNav/>
          <div>
            {this.renderLoading()}
            {this.renderLoaded()}
          </div>
        </div>
    );
  }
}

export default AdminPlayExperimentsPage;
