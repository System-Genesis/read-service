import { Router } from 'express';
import GroupController from './group.controller';
import { wrapController } from '../utils/express';
import ValidateRequest from '../utils/joi';
import * as GroupValidators from './group.validator.schema';

const GroupRouter: Router = Router();

GroupRouter.get('/', ValidateRequest(GroupValidators.getGroupsByCustomFilters), wrapController(GroupController.getAll));
GroupRouter.get('/:id', ValidateRequest(GroupValidators.getGroupById), wrapController(GroupController.getById));
GroupRouter.get('/hierarchy/:hierarchy', ValidateRequest(GroupValidators.getGroupsByHierarchy), wrapController(GroupController.getByHierarchy));
GroupRouter.get('/:id/children', ValidateRequest(GroupValidators.getChildren), wrapController(GroupController.getChildren));

export default GroupRouter;
