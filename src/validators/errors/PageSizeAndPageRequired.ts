import { BaseError } from '../BaseError';

export class PageSizeAndPageRequired extends BaseError {
    private constructor() {
        super(`query.page, query.pageSize are required`);
    }

    static create() {
        return new PageSizeAndPageRequired();
    }
}
