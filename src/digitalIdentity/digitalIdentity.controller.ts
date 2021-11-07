import { Request, Response } from 'express';
// import * as qs from 'qs';
import { Types } from 'mongoose';
import DigitalIdentityManager from './digitalIdentity.manager';
import { RuleFilter } from '../shared/types';
import { DigitalIdentityQueries } from './utils/types';
import ResponseHandler from '../shared/BaseController';

class DigitalIdentityController {
    static digitalIdentityManager: DigitalIdentityManager = new DigitalIdentityManager();

    static extractDigitalIdentityQueries(_req: Request) {
        const { expanded, pageNum, pageSize, direct, ruleFilters, ...userQueries } = _req.query as { [key: string]: string };
        const isExpanded = typeof expanded === 'string' ? expanded === 'true' : !!expanded;
        const page = parseInt(pageNum, 10);
        const limit = parseInt(pageSize, 10);

        let ruleFiltersQuery = typeof ruleFilters === 'string' ? JSON.parse(ruleFilters) : ruleFilters;
        ruleFiltersQuery = ruleFiltersQuery || [];

        return { isExpanded, page, limit, ruleFiltersQuery, userQueries };
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
