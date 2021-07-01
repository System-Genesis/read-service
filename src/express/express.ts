import { Request, Response, query } from 'express';

export interface CustomRequestWithQuery<T> extends Request {
    query: T;
}

export interface CustomResponse<T> extends Response {
    json: (body: T) => Response;
}
