export default class BaseError extends Error {
    public message: string;

    super(message: string) {
        this.message = message;
    }
}
