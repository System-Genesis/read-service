import { Router } from 'express';
import EntityRouter from '../entity/entity.router';
import RoleRouter from '../role/role.router';

const appRouter = Router();

appRouter.use('/entity', EntityRouter);
appRouter.use('/role', RoleRouter);

appRouter.use('/isAlive', (_req, res) => {
    res.status(200).send('alive');
});

appRouter.use('*', (_req, res) => {
    res.status(404).send('Invalid Route');
});

export default appRouter;
