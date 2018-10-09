export default interface IStandardResponse<T> {
    data?: T;
    error?: Error;
    success: boolean;
}