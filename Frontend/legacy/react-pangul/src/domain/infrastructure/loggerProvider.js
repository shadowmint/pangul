let loggerInstance = null;

export default class LoggerProvider {
  constructor() {
    this.logger = loggerInstance;
  }

  static configure(logger) {
    loggerInstance = logger;
  }
}