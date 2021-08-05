import { Router } from 'express';
import DigitalIdentityController from './digitalIdentity.controller';
import { wrapController } from '../utils/express';
import ValidateRequest from '../utils/joi';
import * as DIValidators from './digitalIdentity.validator.schema';

const DigitalIdentityRouter: Router = Router();

DigitalIdentityRouter.get('/', ValidateRequest(DIValidators.getDIByCustomFilters), wrapController(DigitalIdentityController.getAll));
DigitalIdentityRouter.get(
    '/:uniqueId',
    ValidateRequest(DIValidators.getDIByUniqueId),
    wrapController(DigitalIdentityController.getByDigitalIdentityUniqueId),
);
DigitalIdentityRouter.get('/role/:roleId', ValidateRequest(DIValidators.getDIByRoleId), wrapController(DigitalIdentityController.getByRoleId));

export default DigitalIdentityRouter;
