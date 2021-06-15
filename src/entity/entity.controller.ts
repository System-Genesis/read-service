import { Request, Response } from 'express';
import EntityRepository from './entity.repository';

class EntityController {
    static async getAll(_req: Request, res: Response) {
        try {
            const entities = await EntityRepository.find();
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
            const entities = await EntityRepository.find();
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
