export default interface ILogger {
    info(message: string): void;
    error(error: any): void;
}
