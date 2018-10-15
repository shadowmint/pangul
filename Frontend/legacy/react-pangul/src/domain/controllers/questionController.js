import BaseController from '../infrastructure/baseController';

export default class QuestionController extends BaseController {
  constructor() {
    super('/fetch/questions', k => k.questionId);
  }

  create() {
    return {
      questionId: null,
      title: 'new answer',
      body: '...',
      tags: ['new'],
    };
  }
}