import { Request, Response } from 'express';
// import * as qs from 'qs';
import { Types } from 'mongoose';
import DigitalIdentityManager from './digitalIdentity.manager';
import { extractFilters } from './utils/queryParsers';
import { RuleFilter } from '../shared/types';
import { DigitalIdentityQueries } from './utils/types';

class DigitalIdentityController {
    static digitalIdentityManager: DigitalIdentityManager = new DigitalIdentityManager();

    static extractDigitalIdentityQueries(_req: Request) {
        const { expanded, page, limit, direct, ruleFilters, ...userQueries } = _req.query as { [key: string]: string };
        const isExpanded = typeof expanded === 'string' ? expanded === 'true' : !!expanded;
        const pageId: number | string = Types.ObjectId.isValid(page) ? page : 1;
        let pageSize = parseInt(limit, 10);
        pageSize = pageSize < 1000 ? pageSize : 1000;

        const ruleFiltersQuery = typeof ruleFilters === 'string' ? JSON.parse(ruleFilters) : ruleFilters;
        return { isExpanded, pageId, pageSize, ruleFiltersQuery, userQueries };
    }

    static async getAll(_req: Request, res: Response) {
        const { isExpanded, ruleFiltersQuery, pageId, pageSize, userQueries } = DigitalIdentityController.extractDigitalIdentityQueries(_req);
        const digitalIdentities = await DigitalIdentityManager.getAll(userQueries, ruleFiltersQuery, isExpanded, pageId, pageSize);
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
