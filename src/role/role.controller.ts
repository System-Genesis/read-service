import { Request, Response } from 'express';
import { Types } from 'mongoose';
// import * as qs from 'qs';
import { extractFilters } from './utils/queryParsers';
import { RuleFilter } from '../shared/types';
import { roleQueries } from './utils/types';

import RoleManager from './role.manager';

class RoleController {
    static roleManager: RoleManager = new RoleManager();

    static extractRoleQueries(_req: Request) {
        const { pageNum, pageSize, ruleFilters, direct, ...userQueries } = _req.query as { [key: string]: string };
        const page = parseInt(pageNum, 10);
        const limit = parseInt(pageSize, 10);

        const ruleFiltersQuery = typeof ruleFilters === 'string' ? JSON.parse(ruleFilters) : ruleFilters;
        const isDirect = typeof direct === 'string' ? direct === 'true' : !!direct;

        return { isDirect, page, limit, ruleFiltersQuery, userQueries };
    }

    static async getAll(_req: Request, res: Response) {
        const { page, limit, ruleFiltersQuery, userQueries } = RoleController.extractRoleQueries(_req);

        const resRoles = await RoleManager.getAll(userQueries, ruleFiltersQuery, page, limit);
        res.status(200).send(resRoles);
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
        const { isDirect, page, limit, ruleFiltersQuery } = RoleController.extractRoleQueries(_req);

        const resRoles = await RoleManager.findByGroup(_req.params.groupId, ruleFiltersQuery, isDirect, page, limit);
        res.status(200).send(resRoles);
    }

    static async getUnderHierarchy(_req: Request, res: Response) {
        const { isDirect, page, limit, ruleFiltersQuery } = RoleController.extractRoleQueries(_req);
        const { hierarchy } = _req.params as { [key: string]: string };

        const resRoles = await RoleManager.findUnderHierarchy(hierarchy, ruleFiltersQuery, isDirect, page, limit);
        res.status(200).send(resRoles);
    }
}

export default RoleController;
