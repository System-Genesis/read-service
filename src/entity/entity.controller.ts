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
        const { expanded } = _req.query as { [key: string]: string };
        const isExpanded = expanded === 'true';
        try {
            const entities = await EntityManager.findById(_req.params.id, isExpanded);
            res.status(200).send(entities);
        } catch (error) {
            res.send({
                msg: 'Not found',
                status: 404,
            });
        }
    }

    static async getByIdentifier(_req: Request, res: Response) {
        const { expanded } = _req.query as { [key: string]: string };
        const isExpanded = expanded === 'true';
        const { identifier } = _req.params as { [key: string]: string };
        try {
            const entities = await EntityManager.findByIdentifier(identifier, isExpanded);
            res.status(200).send(entities);
        } catch (error) {
            res.send({
                msg: 'Not found',
                status: 404,
            });
        }
    }

    static async getByDigitalIdentity(_req: Request, res: Response) {
        const { expanded } = _req.query as { [key: string]: string };
        const { digitalIdentityUniqueId } = _req.params as { [key: string]: string };
        const isExpanded = expanded === 'true';
        try {
            const entities = await EntityManager.findByDigitalIdentity(digitalIdentityUniqueId, isExpanded);
            res.status(200).send(entities);
        } catch (error) {
            res.send({
                msg: 'Not found',
                status: 404,
            });
        }
    }

    static async getByRole(_req: Request, res: Response) {
        const { expanded } = _req.query as { [key: string]: string };
        const isExpanded = expanded === 'true';
        const { roleID } = _req.params as { [key: string]: string };
        try {
            const entities = await EntityManager.findByRole(roleID, isExpanded);
            res.status(200).send(entities);
        } catch (error) {
            res.send({
                msg: 'Not found',
                status: 404,
            });
        }
    }

    static async getUnderGroup(_req: Request, res: Response) {
        const { expanded } = _req.query as { [key: string]: string };
        const isExpanded = expanded === 'true';
        const { groupId } = _req.params as { [key: string]: string };
        try {
            const entities = await EntityManager.findUnderGroup(groupId, isExpanded);
            res.status(200).send(entities);
        } catch (error) {
            res.send({
                msg: 'Not found',
                status: 404,
            });
        }
    }

    static async getUnderHierarchy(_req: Request, res: Response) {
        const { expanded } = _req.query as { [key: string]: string };
        const { hierarchy } = _req.params as { [key: string]: string };
        const isExpanded = expanded === 'true';
        try {
            const entities = await EntityManager.findUnderHierarchy(hierarchy, isExpanded);
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
