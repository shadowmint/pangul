export default class StandardError extends Error {
    public innerErrors: { [key: string]: string } = {};
    constructor(message: string, errors: { [key: string]: string }) {
        super(message); // (1)
        this.innerErrors = errors;
    }
}
