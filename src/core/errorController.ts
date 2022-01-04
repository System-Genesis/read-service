import * as express from 'express';
import { BadRequestError, NotFoundError } from './ApiErrors';
import ResponseHandler from '../shared/BaseController';
import { PageSizeRequired } from '../validators/errors/PageSizeRequired';
import { PageRequired } from '../validators/errors/PageRequired';
import { PageSizeAndPageRequired } from '../validators/errors/PageSizeAndPageRequired';

const errorMiddleware = (error: Error, _req: express.Request, res: express.Response, next: express.NextFunction) => {
    // console.log('error: ', error);
    if (error instanceof BadRequestError) {
        ResponseHandler.clientError(res, error.message);
    } else if (error instanceof NotFoundError) {
        ResponseHandler.notFound(res, error.message);
    } else if (error instanceof PageSizeRequired || error instanceof PageRequired || error instanceof PageSizeAndPageRequired) {
        ResponseHandler.validationError(res, error.message);
    } else {
        ResponseHandler.internal(res, error.message);
    }

    next();
};

export default errorMiddleware;
