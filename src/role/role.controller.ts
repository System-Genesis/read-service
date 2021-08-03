import { Request, Response } from 'express';
// import * as qs from 'qs';
import { extractFilters } from './utils/queryParsers';
import { RuleFilter } from '../shared/types';
import { roleQueries } from './utils/types';

import RoleManager from './role.manager';

class RoleController {
    static roleManager: RoleManager = new RoleManager();

    static extractRoleQueries(_req: Request) {
        const { page, direct } = _req.query as { [key: string]: string };
        const pageNum = parseInt(page, 10);

        let ruleFiltersQuery = _req.query.ruleFilters as RuleFilter[];
        ruleFiltersQuery = typeof ruleFiltersQuery === 'string' ? JSON.parse(ruleFiltersQuery) : ruleFiltersQuery;
        const isDirect = direct === 'true';

        const userQueries: roleQueries = extractFilters(_req.query as any);
        return { isDirect, pageNum, ruleFiltersQuery, userQueries };
    }

    static async getAll(_req: Request, res: Response) {
        const { pageNum, ruleFiltersQuery } = RoleController.extractRoleQueries(_req);
        const userQueries: roleQueries = extractFilters(_req.query as any);
        const groups = await RoleManager.getAll(userQueries, ruleFiltersQuery);
        res.status(200).send(groups);
    }

    static async getByRoleId(_req: Request, res: Response) {
        const { ruleFiltersQuery } = RoleController.extractRoleQueries(_req);
        const { roleId } = _req.params as { [key: string]: string };
        const foundRole = await RoleManager.findByRoleId(roleId, ruleFiltersQuery);
        res.status(200).send(foundRole);
    }

    static async getByDigitalIdentityUniqueId(_req: Request, res: Response) {
        const { ruleFiltersQuery } = RoleController.extractRoleQueries(_req);
        const foundRole = await RoleManager.findByDigitalIdentity(_req.params.digitalIdentityUniqueId, ruleFiltersQuery);
        res.status(200).send(foundRole);
    }

    static async getByGroupId(_req: Request, res: Response) {
        const { isDirect, pageNum, ruleFiltersQuery } = RoleController.extractRoleQueries(_req);
        const foundRoles = await RoleManager.findByGroup(_req.params.groupId, ruleFiltersQuery, isDirect, pageNum);
        res.status(200).send(foundRoles);
    }
}

export default RoleController;
