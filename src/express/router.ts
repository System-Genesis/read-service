import { Router } from 'express';
import EntityRouter from '../entity/entity.router';
import DigitalIdentityRouter from '../digitalIdentity/digitalIdentity.router';
import RoleRouter from '../role/role.router';
import GroupRouter from '../group/group.router';

const appRouter = Router();

// TODO (M) : move api, isAlive and others to index
appRouter.use('/api/entities', EntityRouter);
appRouter.use('/api/digitalIdentities', DigitalIdentityRouter);
appRouter.use('/api/roles', RoleRouter);
appRouter.use('/api/groups', GroupRouter);

// TODO (M): consider types and underscore is ok
appRouter.use('/isAlive', (_req, res) => {
    res.status(200).send('alive');
});

appRouter.use('*', (_req, res) => {
    res.status(404).send('Invalid Route');
});

export default appRouter;
