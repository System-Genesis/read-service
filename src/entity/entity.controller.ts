import { Request, Response } from 'express';
// import * as qs from 'qs';

import EntityManager from './entity.manager';
import { extractFilters } from './utils/filterQueries';
import { optionalQueries } from './utils/types';

// import { RuleFilter } from './utils/scopeRules';

class EntityController {
    static entityManager: EntityManager = new EntityManager();

    static async getAll(_req: Request, res: Response) {
        const { expanded, page, userFilters, ruleFilters } = _req.query as { [key: string]: string };
        const isExpanded = expanded === 'true';
        console.log('userFilters: ', userFilters);
        const ruleFiltersQuery = ruleFilters ? JSON.parse(ruleFilters) : [];
        const userFiltersQuery = userFilters ? JSON.parse(userFilters) : [];
        console.log('userFiltersQuery: ', userFiltersQuery);

        const userQueries: optionalQueries = extractFilters(_req.query as any);
        console.log('userQueries: ', userQueries);

        const entities = await EntityManager.getAll(userFiltersQuery, ruleFiltersQuery, isExpanded, parseInt(page, 10));
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
