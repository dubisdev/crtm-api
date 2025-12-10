export class ResponseMismatchError extends Error {
    constructor(message: string, public readonly data?: unknown) {
        super(message);
        this.name = "ResponseMismatchError";
    }
}
