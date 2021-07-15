import { Request, Response } from 'express';
import EntityManager from './entity.manager';

class EntityController {
    static entityManager: EntityManager = new EntityManager();

    static async getAll(_req: Request, res: Response) {
        const { expanded } = _req.query as { [key: string]: string };
        const isExpanded = expanded === 'true';
        const queries = { ..._req.query };
        if (isExpanded) {
            delete queries.expanded;
        }
        const entities = await EntityManager.getAll(queries, isExpanded);
        res.status(200).send(entities);
    }

    static async getById(_req: Request, res: Response) {
        const { expanded } = _req.query as { [key: string]: string };
        const isExpanded = expanded === 'true';
        const entities = await EntityManager.findById(_req.params.id, isExpanded);
        res.status(200).send(entities);
    }

    static async getByIdentifier(_req: Request, res: Response) {
        const { expanded } = _req.query as { [key: string]: string };
        const isExpanded = expanded === 'true';
        const { identifier } = _req.params as { [key: string]: string };
        const entities = await EntityManager.findByIdentifier(identifier, isExpanded);
        res.status(200).send(entities);
    }

    static async getByDigitalIdentity(_req: Request, res: Response) {
        const { expanded } = _req.query as { [key: string]: string };
        const { digitalIdentityUniqueId } = _req.params as { [key: string]: string };
        const isExpanded = expanded === 'true';

        const entities = await EntityManager.findByDigitalIdentity(digitalIdentityUniqueId, isExpanded);
        res.status(200).send(entities);
    }

    static async getByRole(_req: Request, res: Response) {
        const { expanded } = _req.query as { [key: string]: string };
        const isExpanded = expanded === 'true';
        const { roleID } = _req.params as { [key: string]: string };

        const entities = await EntityManager.findByRole(roleID, isExpanded);
        res.status(200).send(entities);
    }

    static async getUnderGroup(_req: Request, res: Response) {
        const { expanded } = _req.query as { [key: string]: string };
        const isExpanded = expanded === 'true';
        const { groupId } = _req.params as { [key: string]: string };

        const entities = await EntityManager.findUnderGroup(groupId, isExpanded);
        res.status(200).send(entities);
    }

    static async getUnderHierarchy(_req: Request, res: Response) {
        const { expanded } = _req.query as { [key: string]: string };
        const { hierarchy } = _req.params as { [key: string]: string };
        const isExpanded = expanded === 'true';

        const entities = await EntityManager.findUnderHierarchy(hierarchy, isExpanded);
        res.status(200).send(entities);
    }
}

export default EntityController;
