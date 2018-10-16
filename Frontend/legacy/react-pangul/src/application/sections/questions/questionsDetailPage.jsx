import React from 'react';
import {PangulNavService} from '../../services/pangulNavService';
import AnswerQuestion from '../../elements/questions/answerQuestion';
import QuestionViewEdit from '../../elements/questions/questionViewEdit';
import AnswerListForQuestion from '../../elements/questions/answer/answerList';
import PangulContext from '../../pangulContext';
import './questionsDetailPage.scss';

class QuestionsDetailPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lastUpdate: new Date().getTime().toString(),
    };
    this.events = {
      triggerRefresh: () => this._triggerRefresh(),
    };
  }

  _triggerRefresh() {
    if (!this.alive) return;
    this.setState({
      lastUpdate: new Date().getTime().toString(),
    });
  }

  componentDidMount() {
    this.alive = true;
  }

  componentWillUnmount() {
    this.alive = false;
  }

  render() {
    const match = new PangulNavService().match('/topics/:questionId/:questionTitle?');
    return (
        <div className='component--QuestionsDetailPage'>
          <PangulContext.Consumer>
            {context => (
                <React.Fragment>
                  <QuestionViewEdit
                      questionId={match.params.questionId}
                      api={context.api}
                      updated={this.state.lastUpdate}
                  />
                  <AnswerListForQuestion
                      questionId={match.params.questionId}
                      api={context.api}
                      updated={this.state.lastUpdate}
                  />
                  <div className="newAnswer">
                    <h3>Add new answer to this question?</h3>
                    <AnswerQuestion
                        questionId={match.params.questionId}
                        edit={true}
                        api={context.api}
                        refresh={this.events.triggerRefresh}
                    />
                  </div>
                </React.Fragment>
            )}
          </PangulContext.Consumer>
        </div>
    );
  }
}

export default QuestionsDetailPage;
