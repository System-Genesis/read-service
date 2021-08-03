import { Router } from 'express';
import GroupController from './group.controller';
import { wrapController } from '../utils/express';
// import ValidateRequest from '../utils/joi';
// import * as EntityValidators from './entity.validator.schema';

const GroupRouter: Router = Router();

GroupRouter.get('/:id', wrapController(GroupController.getById));
GroupRouter.get('/hierarchy/:hierarchy', wrapController(GroupController.getByHierarchy));
GroupRouter.get('/:id/children', wrapController(GroupController.getChildren));
GroupRouter.get('/', wrapController(GroupController.getAll));

export default GroupRouter;
