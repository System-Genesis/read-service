import BaseError from './BaseError';

export namespace AppError {
    export class UnexpectedError extends BaseError {
        private err?: any;

        private constructor(err?: any) {
            super('unexpected error occured');
            this.err = err;
        }

        get error() {
            return this.err;
        }

        static create(err?: any) {
            return new UnexpectedError(err);
        }
    }
}
