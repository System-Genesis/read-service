import { AbstractPictureStreamService } from './picturesStream';

export default class PicturesStreamService implements AbstractPictureStreamService {
    protected client: PicturesClient;

    constructor(client: PicturesClient) {
        this.client = client;
    }

    public async getPicture(path: string): Promise<number> {
        const allKeys = await this.getAllKeys(key);
        return allKeys.length;
    }
}
