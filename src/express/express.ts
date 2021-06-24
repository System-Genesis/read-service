import { Request, Response, query } from 'express';

export interface CustomRequestWithQuery extends Request {
    query: { expanded: boolean };
}

export interface CustomResponse<T> extends Response {
    json: (body: T) => Response;
}
