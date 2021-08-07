import { Request, Response } from 'express';
import { Types } from 'mongoose';

import EntityManager from './entity.manager';

class EntityController {
    static entityManager: EntityManager = new EntityManager();

    static extractEntityQueries(_req: Request) {
        const { expanded, page, limit, ruleFilters, ...userQueries } = _req.query as { [key: string]: string };
        const isExpanded = typeof expanded === 'string' ? expanded === 'true' : !!expanded;
        const pageId: number | string = Types.ObjectId.isValid(page) ? page : 1;
        let pageSize = parseInt(limit, 10);
        pageSize = pageSize < 1000 ? pageSize : 1000;
        const ruleFiltersQuery = typeof ruleFilters === 'string' ? JSON.parse(ruleFilters) : ruleFilters;

        return { isExpanded, pageId, pageSize, ruleFiltersQuery, userQueries };
    }

    static async getAll(_req: Request, res: Response) {
        const { isExpanded, pageId, pageSize, ruleFiltersQuery, userQueries } = EntityController.extractEntityQueries(_req);
        const resEntities = await EntityManager.getAll(userQueries, ruleFiltersQuery, isExpanded, pageId, pageSize);
        res.status(200).send(resEntities);
    }

    static async getById(_req: Request, res: Response) {
        const { isExpanded, ruleFiltersQuery } = EntityController.extractEntityQueries(_req);
        const entities = await EntityManager.findById(_req.params.id, ruleFiltersQuery, isExpanded);
        res.status(200).send(entities);
    }

    static async getByIdentifier(_req: Request, res: Response) {
        const { isExpanded, ruleFiltersQuery } = EntityController.extractEntityQueries(_req);
        const { identifier } = _req.params as { [key: string]: string };
        const entities = await EntityManager.findByIdentifier(identifier, ruleFiltersQuery, isExpanded);
        res.status(200).send(entities);
    }

    static async getByDigitalIdentity(_req: Request, res: Response) {
        const { isExpanded, ruleFiltersQuery } = EntityController.extractEntityQueries(_req);
        const { digitalIdentityUniqueId } = _req.params as { [key: string]: string };

        const entities = await EntityManager.findByDigitalIdentity(digitalIdentityUniqueId, ruleFiltersQuery, isExpanded);
        res.status(200).send(entities);
    }

    static async getByRole(_req: Request, res: Response) {
        const { isExpanded, ruleFiltersQuery } = EntityController.extractEntityQueries(_req);
        const { roleId } = _req.params as { [key: string]: string };

        const entities = await EntityManager.findByRole(roleId, ruleFiltersQuery, isExpanded);
        res.status(200).send(entities);
    }

    static async getUnderGroup(_req: Request, res: Response) {
        const { isExpanded, pageId, pageSize, ruleFiltersQuery } = EntityController.extractEntityQueries(_req);
        const { groupId } = _req.params as { [key: string]: string };

        const resEntities = await EntityManager.findUnderGroup(groupId, ruleFiltersQuery, isExpanded, pageId, pageSize);
        res.status(200).send(resEntities);
    }

    static async getUnderHierarchy(_req: Request, res: Response) {
        const { isExpanded, pageId, pageSize, ruleFiltersQuery } = EntityController.extractEntityQueries(_req);
        const { hierarchy } = _req.params as { [key: string]: string };

        const resEntities = await EntityManager.findUnderHierarchy(hierarchy, ruleFiltersQuery, isExpanded, pageId, pageSize);
        res.status(200).send(resEntities);
    }
}

export default EntityController;
