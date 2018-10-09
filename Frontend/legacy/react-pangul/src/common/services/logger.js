export class Logger {
  error() {
    console.log.apply(null, arguments);
  }

  log() {
    console.log.apply(null, arguments);
  }
}
