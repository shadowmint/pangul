import QuestionView from '../../../src/qa/questionView';
import QuestionEdit from '../../../src/qa/questionEdit';
import React from 'react';
import {Answer} from '../../../src/qa/answer';
import {Votes} from '../../../src/qa/votes';

export class QuestionsDemo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tags: ['one', 'two'],
      votes: [
        {
          votes: 10,
          contrib: 0,
          up: false,
          down: false,
          star: false,
        },
        {
          votes: -10,
          contrib: 1,
          up: true,
          down: false,
          star: false,
        },
        {
          votes: -221,
          contrib: -1,
          up: false,
          down: true,
          star: true,
        }],
    };
    this.tagHandler = {
      onTagClicked: (tag) => alert(tag),
      onTagSuggest: (partial) => {
        return Promise.resolve([partial, 'hello', 'world']);
      },
    };
    this.voteHandler = {
      onVote: (dataId, dataType, value) => {
        let lastState = this.state.votes[dataId];
        lastState.up = value > 0;
        lastState.down = value < 0;
        lastState.contrib = lastState.up ? 1 : lastState.down ? -1 : 0;
        this.setState({votes: this.state.votes.slice(0)});
      },
      onStar: (dataId, dataType, value) => {
        let lastState = this.state.votes[dataId];
        lastState.star = value > 0;
        this.setState({votes: this.state.votes.slice(0)});
      },
    };
  }

  render() {
    return (<div>
      <div className="example">
        <QuestionView title={'Hello'}
                      body={'**body**'}
                      questionId={'123'}
                      tags={this.state.tags}
                      tagHandler={this.tagHandler}/>
      </div>
      <div className="example">
        <QuestionEdit title={'Hello'}
                      body={'**body**'}
                      questionId={'123'}
                      tags={this.state.tags}
                      edit={true}
                      tagHandler={this.tagHandler}/>
      </div>
      <div className="example">
        <QuestionEdit title={'Hello'}
                      body={'**body**'}
                      questionId={'123'}
                      tags={this.state.tags}
                      edit={true}
                      height='50%'
                      tagHandler={this.tagHandler}/>
        <div>
          Some following text goes here under the bottom.
        </div>
      </div>
      <div className="example">
        <Answer title={"Hello"}
                body={"**body**"}
                answerId={'123'}
                edit={false}/>
      </div>
      <div className="example">
        <Answer title={"Hello"}
                body={"**body**"}
                answerId={'123'}
                edit={true}/>
      </div>
      <div className="example">
        <Votes votes={this.state.votes[0].votes + this.state.votes[0].contrib}
               dataType="test"
               dataId="0"
               isUp={this.state.votes[0].up}
               isDown={this.state.votes[0].down}
               isStar={this.state.votes[0].star}
               voteHandler={this.voteHandler}
               edit={true}>
          Hello world!
        </Votes>
      </div>
      <div className="example">
        <Votes votes={this.state.votes[1].votes + this.state.votes[1].contrib}
               dataType="test"
               dataId="1"
               isUp={this.state.votes[1].up}
               isDown={this.state.votes[1].down}
               isStar={this.state.votes[1].star}
               voteHandler={this.voteHandler}
               edit={true}>
          Hello world!
        </Votes>
      </div>
      <div className="example">
        <Votes votes={this.state.votes[2].votes + this.state.votes[2].contrib}
               dataType="test"
               dataId="2"
               isUp={this.state.votes[2].up}
               isDown={this.state.votes[2].down}
               isStar={this.state.votes[2].star}
               voteHandler={this.voteHandler}
               edit={false}>
          <Answer title={"Hello"}
                  body={"**body**"}
                  answerId={'123'}
                  edit={false}/>
        </Votes>
      </div>
    </div>);
  }
}
