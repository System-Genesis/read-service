import { Router } from 'express';
import EntityRouter from '../entity/entity.router';

const appRouter = Router();

appRouter.use('/api', EntityRouter);

appRouter.use('/isAlive', (_req, res) => {
    res.status(200).send('alive');
});

appRouter.use('*', (_req, res) => {
    res.status(404).send('Invalid Route');
});

export default appRouter;
