import { Request } from 'express';

class EntityValidator {
    static async somethingThatIsImpossibleToValidateWithSchema(_req: Request) {
        // Some validations
    }
}

export default EntityValidator;
