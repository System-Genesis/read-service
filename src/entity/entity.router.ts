import { Router } from 'express';
import EntityController from './entity.controller';
import { wrapController } from '../utils/express';
import ValidateRequest from '../utils/joi';
import * as EntityValidators from './entity.validator.schema';

const EntityRouter: Router = Router();

// TODO (M) : create a function that takes validateFunc and controllerFunc?

EntityRouter.get('/', ValidateRequest(EntityValidators.getEntitiesByCustomFilters), wrapController(EntityController.getAll));
EntityRouter.get('/:id', ValidateRequest(EntityValidators.getEntitiesById), wrapController(EntityController.getById));
EntityRouter.get(
    '/identifier/:identifier',
    ValidateRequest(EntityValidators.getEntitiesByIdentifier),
    wrapController(EntityController.getByIdentifier),
);
EntityRouter.get(
    '/employeeNumber/:employeeNumber/organization/:organization',
    ValidateRequest(EntityValidators.getByOrgAndEmpNum),
    wrapController(EntityController.getByOrgAndEmpNum),
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
