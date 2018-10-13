export default interface ILogger {
    info(message?: any, ...optionalParams: any[]): void;

    error(error: any): void;
}
