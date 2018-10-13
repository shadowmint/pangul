import "whatwg-fetch";
import IFetch from "../../interfaces/fetch";
import IStandardResponse from "../standardResponse";

export default class AjaxFetch implements IFetch {
    constructor(private rootUrl: string) {
    }

    public async post<T>(url: string, body: any): Promise<IStandardResponse<T>> {
        const apiHeaders = new Headers({
            "Accept": "*/*",
            "Content-Type": "application/json",
            "X-Requested-With": "PANGUL",
        });
        try {
            const response = await fetch(`${this.rootUrl}${url}`, {
                body: JSON.stringify(body),
                cache: "no-cache",
                credentials: "include",
                headers: apiHeaders,
                method: "POST",
                mode: "cors",
                redirect: "follow",
            });

            if (!response.ok) {
                return {
                    error: new Error(`Request failed: ${response.status}: ${response.statusText}`),
                    success: false,
                };
            }

            return await response.json();
        } catch (error) {
            return {
                error,
                success: false,
            };
        }
    }
}
