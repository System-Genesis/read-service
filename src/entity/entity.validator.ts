import { Request } from 'express';
import { PageRequired } from '../validators/errors/PageRequired';
import { PageSizeAndPageRequired } from '../validators/errors/PageSizeAndPageRequired';
import { PageSizeRequired } from '../validators/errors/PageSizeRequired';

class EntityValidator {
    static async somethingThatIsImpossibleToValidateWithSchema(_req: Request) {
        const { stream, page, pageSize } = _req.query;
        const isStream = typeof stream === 'string' ? stream === 'true' : !!stream;
        if (!isStream) {
            if (!page && !pageSize) {
                throw PageSizeAndPageRequired.create();
            } else if (!page) {
                throw PageRequired.create();
            } else if (!pageSize) {
                throw PageSizeRequired.create();
            }
        }
    }
}

export default EntityValidator;
