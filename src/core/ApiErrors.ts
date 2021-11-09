/* eslint-disable max-classes-per-file */
import BaseError from './BaseError';

export class ServiceError extends BaseError {
    public code: number;

    constructor(code: number, message: string) {
        super(message);
        this.code = code;
    }
}

export class InternalError extends ServiceError {
    constructor(message = 'Internal error') {
        super(500, message);
    }
}

export class forbiddenError extends ServiceError {
    constructor(message = 'Permission denied') {
        super(401, message);
    }
}

export class BadRequestError extends ServiceError {
    constructor(message = 'Bad Request') {
        super(400, message);
    }
}

export class NotFoundError extends ServiceError {
    constructor(message = 'Not found') {
        super(404, message);
    }
}
