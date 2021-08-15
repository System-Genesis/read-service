import * as express from 'express';
import { BadRequestError, NotFoundError } from './ApiErrors';
import ResponseHandler from '../shared/BaseController';

const errorMiddleware = (error: Error, _req: express.Request, res: express.Response, next: express.NextFunction) => {
    if (error instanceof BadRequestError) {
        ResponseHandler.clientError(res, error.message);
    } else if (error instanceof NotFoundError) {
        ResponseHandler.notFound(res, error.message);
    } else {
        ResponseHandler.internal(res, error.message);
    }

    next();
};

export default errorMiddleware;
