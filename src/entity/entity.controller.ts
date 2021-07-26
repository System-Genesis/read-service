import { Request, Response } from 'express';
// import * as qs from 'qs';

import EntityManager from './entity.manager';
import { extractFilters } from './utils/filterQueries';
import { optionalQueries, RuleFilter } from './utils/types';

class EntityController {
    static entityManager: EntityManager = new EntityManager();

    static extractEntityQueries(_req: Request) {
        const { expanded, page } = _req.query as { [key: string]: string };
        const isExpanded = expanded === 'true';

        let ruleFiltersQuery = _req.query.ruleFilters as RuleFilter[];
        ruleFiltersQuery = typeof ruleFiltersQuery === 'string' ? JSON.parse(ruleFiltersQuery) : ruleFiltersQuery;
        // ruleFilters = ruleFilters ?

        const userQueries: optionalQueries = extractFilters(_req.query as any);
        return { isExpanded, page, ruleFiltersQuery, userQueries };
    }

    static async getAll(_req: Request, res: Response) {
        const { isExpanded, page, ruleFiltersQuery, userQueries } = EntityController.extractEntityQueries(_req);
        const entities = await EntityManager.getAll(userQueries, ruleFiltersQuery, isExpanded, parseInt(page, 10));
        res.status(200).send(entities);
    }

    static async getById(_req: Request, res: Response) {
        const { isExpanded, ruleFiltersQuery } = EntityController.extractEntityQueries(_req);
        const entities = await EntityManager.findById(_req.params.id, ruleFiltersQuery, isExpanded);
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
        const { roleId } = _req.params as { [key: string]: string };

        const entities = await EntityManager.findByRole(roleId, isExpanded);
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
