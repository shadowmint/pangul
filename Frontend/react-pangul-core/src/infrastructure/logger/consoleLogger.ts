import ILogger from "../../interfaces/logger";

export default class ConsoleLogger implements ILogger {
    public error(error: any): void {
        if (!error) {
            return;
        }
        // @ts-ignore
        // noinspection TsLint
        console.error(error);
    }

    public info(message?: any, ...optionalParams: any[]): void {
        // @ts-ignore
        // noinspection TsLint
        console.log(message, ...optionalParams);
    }
}