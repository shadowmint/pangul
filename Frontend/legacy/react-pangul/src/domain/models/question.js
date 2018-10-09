import Model from 'react-model/src/model';
import QuestionController from '../controllers/questionController';

export default class Question extends Model {
  constructor(parent) {
    super('questionId', new QuestionController(), parent);
  }
}