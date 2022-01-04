import { BaseError } from '../BaseError';

export class PageRequired extends BaseError {
    private constructor() {
        super(`query.page is required`);
    }

    static create() {
        return new PageRequired();
    }
}
