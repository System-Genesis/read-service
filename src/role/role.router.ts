import { Router } from 'express';
import RoleController from './role.controller';
import { wrapController } from '../utils/express';
// import ValidateRequest from '../utils/joi';
// import * as EntityValidators from './entity.validator.schema';

const RoleRouter: Router = Router();

// RoleRouter.get('/', wrapController(RoleController.getAll));
RoleRouter.get('/:roleId', wrapController(RoleController.getByRoleId));
RoleRouter.get('/digitalIdentity/:digitalIdentityUniqueId', wrapController(RoleController.getByDigitalIdentityUniqueId));
RoleRouter.get('/group/:groupId', wrapController(RoleController.getByGroupId));

// RoleRouter.get('/hardToValidateWithSchema', wrapValidator(EntityValidator.somethingThatIsImpossibleToValidateWithSchema));

export default RoleRouter;
