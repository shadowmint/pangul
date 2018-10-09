import IFetch from "../../interfaces/fetch";
import IStandardResponse from "../standardResponse";
import 'whatwg-fetch';

export default class AjaxFetch implements IFetch {
    constructor(private rootUrl: string) {
    }

    public async post<T>(url: string, body: any): Promise<IStandardResponse<T>> {
        const apiHeaders = new Headers({
            'X-Requested-With': 'PANGUL',
            'Content-Type': 'application/json',
            Accept: '*/*',
        });
        try {
            const response = await fetch(`${this.rootUrl}${url}`, {
                method: 'POST',
                mode: 'cors',
                cache: 'no-cache',
                redirect: 'follow',
                credentials: 'include',
                headers: apiHeaders,
                body: JSON.stringify(body),
            });

            if (!response.ok) {
                return {
                    error: new Error(`Request failed: ${response.status}: ${response.statusText}`),
                    success: false
                };
            }

            const asData = await response.json();
            return {
                data: asData as T,
                success: true
            };
        } catch (error) {
            return {
                error,
                success: false
            }
        }
    }
}