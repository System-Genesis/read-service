import { Request, Response } from 'express';
import { Types } from 'mongoose';

import EntityManager from './entity.manager';
import { extractFilters } from './utils/queryParsers';
import { RuleFilter } from '../shared/types';
import { EntityQueries } from './utils/types';

class EntityController {
    static entityManager: EntityManager = new EntityManager();

    static extractEntityQueries(_req: Request) {
        const { expanded, page, limit } = _req.query as { [key: string]: string };
        const isExpanded = expanded === 'true';
        const pageId: number | string = Types.ObjectId.isValid(page) ? page : 1;
        let pageSize = parseInt(limit, 10);
        pageSize = pageSize < 1000 ? pageSize : 1000;
        let ruleFiltersQuery = _req.query.ruleFilters as RuleFilter[];
        ruleFiltersQuery = typeof ruleFiltersQuery === 'string' ? JSON.parse(ruleFiltersQuery) : ruleFiltersQuery;

        const userQueries: EntityQueries = extractFilters(_req.query as any);
        return { isExpanded, pageId, pageSize, ruleFiltersQuery, userQueries };
    }

    static async getAll(_req: Request, res: Response) {
        const { isExpanded, pageId, pageSize, ruleFiltersQuery, userQueries } = EntityController.extractEntityQueries(_req);
        const { entities, nextPage } = await EntityManager.getAll(userQueries, ruleFiltersQuery, isExpanded, pageId, pageSize);
        res.status(200).send({ entities, nextPage });
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

        const { entities, nextPage } = await EntityManager.findUnderGroup(groupId, ruleFiltersQuery, isExpanded, pageId, pageSize);
        res.status(200).send({ entities, nextPage });
    }

    static async getUnderHierarchy(_req: Request, res: Response) {
        const { isExpanded, pageId, pageSize, ruleFiltersQuery } = EntityController.extractEntityQueries(_req);
        const { hierarchy } = _req.params as { [key: string]: string };

        const { entities, nextPage } = await EntityManager.findUnderHierarchy(hierarchy, ruleFiltersQuery, isExpanded, pageId, pageSize);
        res.status(200).send({ entities, nextPage });
    }
}

export default EntityController;
