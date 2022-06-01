import AWS from 'aws-sdk';
import { Readable } from 'stream';
import { Response } from 'express';

export default abstract class ResponseHandler {
    // TODO: needed sanitize? in manager logic?
    private static sanitize<T>(response: T): T {
        const clone: T = {} as T;
        Object.assign(clone, response);
        Object.keys(clone).forEach((key) => (clone[key] === undefined || clone[key] === null ? delete clone[key] : {}));
        return clone;
    }

    static success<T>(res: Response, dto?: T) {
        let sanitized;
        if (dto) {
            if (Array.isArray(dto)) {
                sanitized = dto.map((d) => ResponseHandler.sanitize(d));
            } else {
                sanitized = ResponseHandler.sanitize(dto);
            }
        }
        return res.status(200).json(sanitized);
    }

    static jsonResponse(res: Response, code: number, message: string) {
        return res.status(code).json({ message });
    }

    static clientError(res: Response, message?: string) {
        return this.jsonResponse(res, 400, message || 'Bad Request');
    }

    static validationError(res: Response, message?: string) {
        return this.jsonResponse(res, 400, message || 'Validation Error');
    }

    static notFound(res: Response, message?: string) {
        return this.jsonResponse(res, 404, message || 'Not found');
    }

    static conflict(res: Response, message?: string) {
        return this.jsonResponse(res, 409, message || 'Conflict');
    }

    static forbidden(res: Response, message?: string) {
        return this.jsonResponse(res, 403, message || 'Forbidden');
    }

    static internal(res: Response, message?: string) {
        return this.jsonResponse(res, 500, message || 'Internal Error');
    }

    static picture(res: Response, streamProvider: Readable, message?: string) {
        res.writeHead(200, { 'Content-Type': 'image/jpeg' });

        return streamProvider.pipe(res);
    }
}
