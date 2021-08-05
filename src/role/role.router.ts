import { Router } from 'express';
import RoleController from './role.controller';
import { wrapController } from '../utils/express';
import ValidateRequest from '../utils/joi';
import * as RoleValidators from './role.validator.schema';

const RoleRouter: Router = Router();

RoleRouter.get('/', ValidateRequest(RoleValidators.getRolesByCustomFilters), wrapController(RoleController.getAll));
RoleRouter.get('/:roleId', ValidateRequest(RoleValidators.getRoleByRoleId), wrapController(RoleController.getByRoleId));
RoleRouter.get(
    '/digitalIdentity/:digitalIdentityUniqueId',
    ValidateRequest(RoleValidators.getRoleByDIUniqueId),
    wrapController(RoleController.getByDigitalIdentityUniqueId),
);
RoleRouter.get('/group/:groupId', ValidateRequest(RoleValidators.getRolesByGroupId), wrapController(RoleController.getByGroupId));
RoleRouter.get('/hierarchy/:hierarchy', ValidateRequest(RoleValidators.getRolesByHierarchy), wrapController(RoleController.getRolesByHierarchy));

// RoleRouter.get('/hardToValidateWithSchema', wrapValidator(EntityValidator.somethingThatIsImpossibleToValidateWithSchema));

export default RoleRouter;
