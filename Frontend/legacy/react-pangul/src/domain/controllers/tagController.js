import BaseController from '../infrastructure/baseController';

export default class TagController extends BaseController {
  constructor() {
    super('/fetch/tag', k => k.answerId);
  }

  create() {
    return {
      answerId: null
    };
  }
}