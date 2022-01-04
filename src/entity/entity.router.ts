import { Router } from 'express';
import EntityController from './entity.controller';
import { wrapController, wrapValidator } from '../utils/express';
import ValidateRequest from '../utils/joi';
import * as EntityValidators from './entity.validator.schema';
import EntityValidator from './entity.validator';

const EntityRouter: Router = Router();

EntityRouter.get(
    '/',
    ValidateRequest(EntityValidators.getEntitiesByCustomFilters),
    wrapValidator(EntityValidator.somethingThatIsImpossibleToValidateWithSchema),
    wrapController(EntityController.getAll),
);
EntityRouter.get('/:id', ValidateRequest(EntityValidators.getEntitiesById), wrapController(EntityController.getById));
EntityRouter.get(
    '/identifier/:identifier',
    ValidateRequest(EntityValidators.getEntitiesByIdentifier),
    wrapController(EntityController.getByIdentifier),
);
EntityRouter.get(
    '/digitalIdentity/:digitalIdentityUniqueId',
    ValidateRequest(EntityValidators.getEntitiesByDigitalIdentity),
    wrapController(EntityController.getByDigitalIdentity),
);
EntityRouter.get('/role/:roleId', ValidateRequest(EntityValidators.getEntitiesByRole), wrapController(EntityController.getByRole));
EntityRouter.get('/group/:groupId', ValidateRequest(EntityValidators.getEntitiesByGroup), wrapController(EntityController.getUnderGroup));
EntityRouter.get(
    '/hierarchy/:hierarchy',
    ValidateRequest(EntityValidators.getEntitiesByHierarchy),
    wrapController(EntityController.getUnderHierarchy),
);
EntityRouter.get(
    '/:identifier/pictures/profile',
    ValidateRequest(EntityValidators.getPictureByIdentifier),
    wrapController(EntityController.getPictureByIdentifier),
);

// EntityRouter.get('/hardToValidateWithSchema', wrapValidator(EntityValidator.somethingThatIsImpossibleToValidateWithSchema));

export default EntityRouter;
function somethingThatIsImpossibleToValidateWithSchema(
    somethingThatIsImpossibleToValidateWithSchema: any,
): import('express-serve-static-core').RequestHandler<
    import('express-serve-static-core').ParamsDictionary,
    any,
    any,
    import('qs').ParsedQs,
    Record<string, any>
> {
    throw new Error('Function not implemented.');
}
