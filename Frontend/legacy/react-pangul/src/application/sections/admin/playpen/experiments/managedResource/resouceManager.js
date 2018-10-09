import {BehaviorSubject} from 'rxjs';

export default class ResourceManager {
  constructor(initalState, applyChange, initialLoad) {
    this._state = initalState;
    this._apply = applyChange;
    if (initialLoad) {
      initialLoad();
    }
  }

  /** Update the props */
  update(state) {
    return new Promise(resolve => {
      this._state = {...this._state, ...state};
      this._apply(this._state, () => resolve);
    });
  }
}

// TODO: State
// TODO: QuestionState
// TODO: AnswerState
// TODO: AnswerListState