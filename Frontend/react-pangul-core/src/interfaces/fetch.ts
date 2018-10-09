import IStandardResponse from "../infrastructure/standardResponse";

export default interface IFetch {
    /** Make a JSON post to the given url and return a parsed json response */
    post<T>(url: string, body?: any): Promise<IStandardResponse<T>>;
}
