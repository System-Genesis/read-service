/* eslint-disable max-classes-per-file */
import { Response } from 'express';

// enum ResponseStatus {
//     SUCCESS = 200,
//     BAD_REQUEST = 400,
//     UNAUTHORIZED = 401,
//     FORBIDDEN = 403,
//     NOT_FOUND = 404,
//     INTERNAL_ERROR = 500,
// }

// abstract class ApiResponse {
//     constructor(protected status: ResponseStatus, protected message: string) {}

//     protected prepare<T extends ApiResponse>(res: Response, response: T): Response {
//         return res.status(this.status).json(ApiResponse.sanitize(response));
//     }

//     public send(res: Response): Response {
//         return this.prepare<ApiResponse>(res, this);
//     }

//     private static sanitize<T extends ApiResponse>(response: T): T {
//         const clone: T = {} as T;
//         Object.assign(clone, response);
//         delete clone.status;
//         Object.keys(clone).forEach((key) => (clone[key] === undefined ? delete clone[key] : {}));
//         return clone;
//     }
// }

// export default class SuccessResponse<T> extends ApiResponse {
//     constructor(message: string, private data: T) {
//         super(ResponseStatus.SUCCESS, message);
//     }

//     send(res: Response): Response {
//         return super.prepare<SuccessResponse<T>>(res, this);
//     }
// }
