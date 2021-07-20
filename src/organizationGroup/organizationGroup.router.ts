import { Router } from 'express';
import GroupController from './organizationGroup.controller';
import { wrapController } from '../utils/express';
// import ValidateRequest from '../utils/joi';
// import * as EntityValidators from './entity.validator.schema';

const GroupRouter: Router = Router();

// RoleRouter.get('/', wrapController(RoleController.getAll));
GroupRouter.get('/id/:id', wrapController(GroupController.getById));
// RoleRouter.get(
//     '/identifier/:identifier',
//     ValidateRequest(EntityValidators.getEntitiesByIdentifier),
//     wrapController(EntityController.getByIdentifier),
// );
// RoleRouter.get(
//     '/digitalIdentity/:digitalIdentityUniqueId',
//     ValidateRequest(EntityValidators.getEntitiesByDigitalIdentity),
//     wrapController(EntityController.getByDigitalIdentity),
// );
// RoleRouter.get('/role/:roleId', ValidateRequest(EntityValidators.getEntitiesByRole), wrapController(EntityController.getByRole));
// RoleRouter.get('/group/:groupId', ValidateRequest(EntityValidators.getEntitiesByGroup), wrapController(EntityController.getUnderGroup));
// RoleRouter.get(
//     '/hierarchy/:hierarchy',
//     ValidateRequest(EntityValidators.getEntitiesByHierarchy),
//     wrapController(EntityController.getUnderHierarchy),
// );

// RoleRouter.get('/hardToValidateWithSchema', wrapValidator(EntityValidator.somethingThatIsImpossibleToValidateWithSchema));

export default GroupRouter;
