import { Request, Response } from 'express';
// import qs from 'qs';
import { Types } from 'mongoose';
import DigitalIdentityManager from './digitalIdentity.manager';
import { RuleFilter } from '../shared/types';
import { DigitalIdentityQueries } from './utils/types';
import ResponseHandler from '../shared/BaseController';
import { sanitizeUndefined, splitQueryValue } from '../utils/utils';

class DigitalIdentityController {
    static digitalIdentityManager: DigitalIdentityManager = new DigitalIdentityManager();

    static extractDigitalIdentityQueries(_req: Request) {
        const { expanded, page, pageSize, direct, ruleFilters, ...userQueries } = _req.query as { [key: string]: string };
        const isExpanded = typeof expanded === 'string' ? expanded === 'true' : !!expanded;
        const pageNum = parseInt(page, 10);
        const limit = parseInt(pageSize, 10);
        userQueries.source = splitQueryValue(userQueries.source);
        userQueries.type = splitQueryValue(userQueries.type);
        let ruleFiltersQuery = typeof ruleFilters === 'string' ? JSON.parse(ruleFilters) : ruleFilters;
        ruleFiltersQuery = ruleFiltersQuery || [];
        sanitizeUndefined(userQueries);
        return { isExpanded, page: pageNum, limit, ruleFiltersQuery, userQueries };
    }

    static async getAll(_req: Request, res: Response) {
        const { isExpanded, ruleFiltersQuery, page, limit, userQueries } = DigitalIdentityController.extractDigitalIdentityQueries(_req);
        const digitalIdentities = await DigitalIdentityManager.getAll(userQueries, ruleFiltersQuery, isExpanded, page, limit);
        ResponseHandler.success(res, digitalIdentities);
    }

    static async getByRoleId(_req: Request, res: Response) {
        const { isExpanded, ruleFiltersQuery } = DigitalIdentityController.extractDigitalIdentityQueries(_req);
        const foundDigitalIdentity = await DigitalIdentityManager.findByRoleId(_req.params.roleId, ruleFiltersQuery, isExpanded);
        ResponseHandler.success(res, foundDigitalIdentity);
    }

    static async getByDigitalIdentityUniqueId(_req: Request, res: Response) {
        const { isExpanded, ruleFiltersQuery } = DigitalIdentityController.extractDigitalIdentityQueries(_req);
        const foundDigitalIdentity = await DigitalIdentityManager.findByUniqueId(_req.params.uniqueId, ruleFiltersQuery, isExpanded);
        ResponseHandler.success(res, foundDigitalIdentity);
    }
}

export default DigitalIdentityController;
