import { Readable } from 'stream';

export interface IPictureStreamService {
    getPicture(path: string): Promise<Readable>;
}
