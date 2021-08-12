import { Request, Response } from 'express';
import { Types } from 'mongoose';

import EntityManager from './entity.manager';

class EntityController {
    static entityManager: EntityManager = new EntityManager();

    static extractEntityQueries(_req: Request) {
        const { expanded, pageNum, pageSize, ruleFilters, ...userQueries } = _req.query as { [key: string]: string };
        const isExpanded = typeof expanded === 'string' ? expanded === 'true' : !!expanded;
        const page = parseInt(pageNum, 10);
        const limit = parseInt(pageSize, 10);

        const ruleFiltersQuery = typeof ruleFilters === 'string' ? JSON.parse(ruleFilters) : ruleFilters;

        return { isExpanded, page, limit, ruleFiltersQuery, userQueries };
    }

    static async getAll(_req: Request, res: Response) {
        const { isExpanded, page, limit, ruleFiltersQuery, userQueries } = EntityController.extractEntityQueries(_req);
        const resEntities = await EntityManager.getAll(userQueries, ruleFiltersQuery, isExpanded, page, limit);
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
        const { isExpanded, page, limit, ruleFiltersQuery } = EntityController.extractEntityQueries(_req);
        const { groupId } = _req.params as { [key: string]: string };

        const resEntities = await EntityManager.findUnderGroup(groupId, ruleFiltersQuery, isExpanded, page, limit);
        res.status(200).send(resEntities);
    }

    static async getUnderHierarchy(_req: Request, res: Response) {
        const { isExpanded, page, limit, ruleFiltersQuery } = EntityController.extractEntityQueries(_req);
        const { hierarchy } = _req.params as { [key: string]: string };

        const resEntities = await EntityManager.findUnderHierarchy(hierarchy, ruleFiltersQuery, isExpanded, page, limit);
        res.status(200).send(resEntities);
    }

    static async getPictureByIdentifier(_req: Request, res: Response) {
        const { ruleFiltersQuery } = EntityController.extractEntityQueries(_req);
        const { identifier } = _req.params as { [key: string]: string };
        const entities = await EntityManager.getPictureByIdentifier(identifier, ruleFiltersQuery);
        res.status(200).send(entities);
    }
}

export default EntityController;
