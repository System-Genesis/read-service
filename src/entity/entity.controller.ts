import { Request, Response } from 'express';
import EntityManager from './entity.manager';

class EntityController {
    static entityManager: EntityManager = new EntityManager();

    static async getAll(_req: Request, res: Response) {
        try {
            const entities = await EntityManager.getAll();
            res.status(200).send(entities);
        } catch (error) {
            res.send({
                msg: 'Not found',
                status: 404,
            });
        }
    }

    static async getById(_req: Request, res: Response) {
        try {
            const entities = await EntityManager.getById(_req.params.id);
            res.status(200).send(entities);
        } catch (error) {
            res.send({
                msg: 'Not found',
                status: 404,
            });
        }
    }
}

export default EntityController;
