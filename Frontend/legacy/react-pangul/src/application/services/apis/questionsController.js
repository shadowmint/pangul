export class QuestionsController {
  constructor(fetch, logger) {
    this.fetch = fetch;
    this.logger = logger;
  }

  async getQuestion(questionId) {
    return await this._fetch('/fetch/questions/get', {id: questionId});
  }
  
  async askNewQuestion(question) {
    return await this._fetch('/fetch/questions/ask', question);
  }

  async searchForQuestions(query) {
    return await this._fetch('/fetch/questions/search', {query});
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
