export default class AnswersController {
  constructor(fetch, logger) {
    this.fetch = fetch;
    this.logger = logger;
  }

  async add(questionId, answerModel) {
    return await this._fetch('/fetch/answers/add', {questionId: questionId, answer: answerModel});
  }

  async update(answerModel) {
    return await this._fetch('/fetch/answers/update', answerModel);
  }
  
  async search(query) {
    return await this._fetch('/fetch/answers/search', query);
  }

  async get(answerId) {
    return await this._fetch('/fetch/answers/get', {answerId: answerId});
  }
  
  async _fetch(url, payload) {
    try {
      const response = await this.fetch.post(url, payload);
      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          return data.data;
        }
      }
      this.logger.error('Failed', response);
    } catch (error) {
      this.logger.error(error);
    }
    throw new Error('API request failed');
  }
}
