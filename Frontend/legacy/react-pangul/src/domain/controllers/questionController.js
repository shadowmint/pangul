import BaseController from '../infrastructure/baseController';

export default class QuestionController extends BaseController {
  constructor() {
    super('/fetch/topics', k => k.questionId);
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