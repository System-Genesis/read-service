import { Request } from 'express';

class EntityValidator {
    static async somethingThatIsImpossibleToValidateWithSchema(_req: Request) {}
}

export default EntityValidator;
