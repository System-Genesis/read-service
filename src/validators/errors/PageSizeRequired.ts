import { BaseError } from '../BaseError';

export class PageSizeRequired extends BaseError {
    private constructor() {
        super(`query.pageSize is required`);
    }

    static create() {
        return new PageSizeRequired();
    }
}
