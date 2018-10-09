import BaseController from '../infrastructure/baseController';

export default class AnswerController extends BaseController {
  constructor() {
    super('/fetch/answer', k => k.answerId);
  }

  create() {
    return {
      answerId: null
    };
  }
}