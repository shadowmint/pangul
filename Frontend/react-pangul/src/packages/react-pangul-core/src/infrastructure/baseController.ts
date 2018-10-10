import IFetch from "../interfaces/fetch";
import ILogger from "../interfaces/logger";
import {FetchProvider} from "../providers/fetchProvider";
import {LoggerProvider} from "../providers/loggerProvider";

export class BaseController {
    private get fetch(): IFetch {
        return FetchProvider.get();
    }

    private get logger(): ILogger {
        return LoggerProvider.get();
    }

    protected async post<TResponse>(url: string, body: any | null): Promise<TResponse> {
        const response = await this.fetch.post<TResponse>(url, body);
        if (response.success) {
            return response.data as TResponse;
        }
        this.logger.error(response);
        throw new Error("Internal server error");
    }
}
