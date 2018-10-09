import Model from 'react-model/src/model';
import AnswerController from '../controllers/answerController';

export default class Answer extends Model {
  constructor(parent) {
    super('answerId', new AnswerController(), parent);
  }
}