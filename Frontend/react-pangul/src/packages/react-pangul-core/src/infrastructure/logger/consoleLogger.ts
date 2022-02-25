import ILogger from "../../interfaces/logger";

export default class ConsoleLogger implements ILogger {
    public error(error: any): void {
        if (!error) {
            return;
        }
        (window.console as any).error(error);
    }

    public info(message?: any, ...optionalParams: any[]): void {
        (window.console as any).log(message, ...optionalParams);
    }
}