import { Request } from 'express';

// TODO (M): remove all validator classes modules
class EntityValidator {
    static async somethingThatIsImpossibleToValidateWithSchema(_req: Request) {
        // Some validations
    }
}

export default EntityValidator;
