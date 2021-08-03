import { Router } from 'express';
import DigitalIdentityController from './digitalIdentity.controller';
import { wrapController } from '../utils/express';
// import ValidateRequest from '../utils/joi';
// import * as EntityValidators from './entity.validator.schema';

const DigitalIdentityRouter: Router = Router();

DigitalIdentityRouter.get('/', wrapController(DigitalIdentityController.getAll));
DigitalIdentityRouter.get('/:uniqueId', wrapController(DigitalIdentityController.getByDigitalIdentityUniqueId));
DigitalIdentityRouter.get('/role/:roleId', wrapController(DigitalIdentityController.getByRoleId));

export default DigitalIdentityRouter;
