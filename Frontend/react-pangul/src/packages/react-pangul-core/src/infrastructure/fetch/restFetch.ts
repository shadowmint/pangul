import * as request from "request";
import IFetch from "../../interfaces/fetch";
import ILogger from "../../interfaces/logger";
import {LoggerProvider} from "../../providers/loggerProvider";
import IStandardResponse from "../standardResponse";

const DEBUG = true;

const cookieEnabledRequests = request.defaults({jar: true});

export default class RestFetch implements IFetch {
    constructor(private rootUrl: string) {
    }

    public async post<T>(url: string, body?: any): Promise<IStandardResponse<T>> {
        return new Promise<IStandardResponse<T>>((resolve) => {
            try {
                const messageBody = body ? JSON.stringify(body) : "";
                const externalUrl = `${this.rootUrl}${url}`;
                cookieEnabledRequests.post(externalUrl, {
                    body: messageBody,
                    headers: {
                        "Origin": "http://localhost:8080",
                        "Referer": "http://localhost:8080",
                        "X-Requested-With": "PANGUL",
                        "content-type": "application/json",
                    },
                }, (error, response, responseBody) => {
                    if (error) {
                        this.logger.error(`[ERROR] POST ${externalUrl} ${messageBody} -> ${error}`);
                        resolve({
                            data: {} as T,
                            error,
                            success: false,
                        });
                        return;
                    } else {
                        if (DEBUG) {
                            const code = response.statusCode;
                            if (code === 200) {
                                this.logger.info(`POST ${externalUrl} ${messageBody} -> ${code} ${responseBody}`);
                            } else {
                                this.logger.error(`POST ${externalUrl} ${messageBody} -> ${code} ${responseBody}`);
                            }
                        }
                        try {
                            resolve(JSON.parse(responseBody) as IStandardResponse<T>);
                            return;
                        } catch (error) {
                            resolve({
                                data: {} as T,
                                error: error as Error,
                                success: false,
                            });
                            return;
                        }
                    }
                });
            } catch (error) {
                resolve({
                    data: {} as T,
                    error: error as Error,
                    success: false,
                });
            }
        });
    }

    private get logger(): ILogger {
        return LoggerProvider.get();
    }
}
