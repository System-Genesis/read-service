import { Router } from 'express';
import RoleController from './role.controller';
import { wrapController } from '../utils/express';
// import ValidateRequest from '../utils/joi';
// import * as EntityValidators from './entity.validator.schema';

const RoleRouter: Router = Router();

// RoleRouter.get('/', wrapController(RoleController.getAll));
RoleRouter.get('/:roleId', wrapController(RoleController.getByRoleId));
RoleRouter.get('/digitalIdentity/:digitalIdentityUniqueId', wrapController(RoleController.getByDigitalIdentityUniqueId));
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

export default RoleRouter;
