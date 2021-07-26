import { Router } from 'express';
import DigitalIdentityController from './digitalIdentity.controller';
import { wrapController } from '../utils/express';
// import ValidateRequest from '../utils/joi';
// import * as EntityValidators from './entity.validator.schema';

const DigitalIdentityRouter: Router = Router();

// RoleRouter.get('/', wrapController(RoleController.getAll));
DigitalIdentityRouter.get('/:uniqueId', wrapController(DigitalIdentityController.getByDigitalIdentityUniqueId));
DigitalIdentityRouter.get('/role/:roleId', wrapController(DigitalIdentityController.getByRoleId));
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

export default DigitalIdentityRouter;
