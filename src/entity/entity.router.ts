import { Router } from 'express';
import EntityController from './entity.controller';
// import EntityValidator from './entity.validator';
import { wrapController } from '../utils/express';
// import ValidateRequest from '../utils/joi';
// import { getFoldersRequestSchema, createFolderRequestSchema } from './entity.validator.schema';

const EntityRouter: Router = Router();

EntityRouter.get('/', wrapController(EntityController.getAll));
EntityRouter.get('/:id', wrapController(EntityController.getById));
// EntityRouter.get('/hardToValidateWithSchema', wrapValidator(EntityValidator.somethingThatIsImpossibleToValidateWithSchema));

export default EntityRouter;
