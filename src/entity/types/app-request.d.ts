import { Request } from 'express';

declare interface GetAllRequest extends Request {
    expanded: string;
}
