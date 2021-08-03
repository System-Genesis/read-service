import { Router } from 'express';
import EntityRouter from '../entity/entity.router';
import DigitalIdentityRouter from '../digitalIdentity/digitalIdentity.router';
import RoleRouter from '../role/role.router';
import GroupRouter from '../group/group.router';

const appRouter = Router();

appRouter.use('/entities', EntityRouter);
appRouter.use('/digitalIdentities', DigitalIdentityRouter);
appRouter.use('/roles', RoleRouter);
appRouter.use('/groups', GroupRouter);

appRouter.use('/isAlive', (_req, res) => {
    res.status(200).send('alive');
});

appRouter.use('*', (_req, res) => {
    res.status(404).send('Invalid Route');
});

export default appRouter;
