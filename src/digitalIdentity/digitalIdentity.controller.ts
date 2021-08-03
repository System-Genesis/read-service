import { Request, Response } from 'express';
// import * as qs from 'qs';

import DigitalIdentityManager from './digitalIdentity.manager';
import { extractFilters } from './utils/queryParsers';
import { RuleFilter } from '../shared/types';
import { DigitalIdentityQueries } from './utils/types';

class DigitalIdentityController {
    static digitalIdentityManager: DigitalIdentityManager = new DigitalIdentityManager();

    static extractDigitalIdentityQueries(_req: Request) {
        const { page, expanded } = _req.query as { [key: string]: string };
        const pageNum = parseInt(page, 10);
        const isExpanded = expanded === 'true';
        let ruleFiltersQuery = _req.query.ruleFilters as RuleFilter[];
        ruleFiltersQuery = typeof ruleFiltersQuery === 'string' ? JSON.parse(ruleFiltersQuery) : ruleFiltersQuery;

        const userQueries: DigitalIdentityQueries = extractFilters(_req.query as any);
        return { isExpanded, pageNum, ruleFiltersQuery, userQueries };
    }

    static async getAll(_req: Request, res: Response) {
        const { isExpanded, ruleFiltersQuery } = DigitalIdentityController.extractDigitalIdentityQueries(_req);
        const userQueries: DigitalIdentityQueries = extractFilters(_req.query as any);
        const digitalIdentities = await DigitalIdentityManager.getAll(userQueries, ruleFiltersQuery, isExpanded);
        res.status(200).send(digitalIdentities);
    }

    static async getByRoleId(_req: Request, res: Response) {
        const { isExpanded, ruleFiltersQuery } = DigitalIdentityController.extractDigitalIdentityQueries(_req);
        const foundDigitalIdentity = await DigitalIdentityManager.findByRoleId(_req.params.roleId, ruleFiltersQuery, isExpanded);
        res.status(200).send(foundDigitalIdentity);
    }

    static async getByDigitalIdentityUniqueId(_req: Request, res: Response) {
        const { isExpanded, ruleFiltersQuery } = DigitalIdentityController.extractDigitalIdentityQueries(_req);
        const foundDigitalIdentity = await DigitalIdentityManager.findByUniqueId(_req.params.uniqueId, ruleFiltersQuery, isExpanded);
        res.status(200).send(foundDigitalIdentity);
    }
}

export default DigitalIdentityController;
