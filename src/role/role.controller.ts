import { Request, Response } from 'express';
import ResponseHandler from '../shared/BaseController';
import { RoleDTO } from './role.DTO';

import RoleManager from './role.manager';

class RoleController {
    static roleManager: RoleManager = new RoleManager();

    static extractRoleQueries(_req: Request) {
        const { pageNum, pageSize, ruleFilters, direct, ...userQueries } = _req.query as { [key: string]: string };
        const page = parseInt(pageNum, 10);
        const limit = parseInt(pageSize, 10);
        let ruleFiltersQuery = typeof ruleFilters === 'string' ? JSON.parse(ruleFilters) : ruleFilters;
        ruleFiltersQuery = ruleFiltersQuery || [];

        const isDirect = typeof direct === 'string' ? direct === 'true' : !!direct;

        return { isDirect, page, limit, ruleFiltersQuery, userQueries };
    }

    static async getAll(_req: Request, res: Response) {
        const { page, limit, ruleFiltersQuery, userQueries } = RoleController.extractRoleQueries(_req);

        const resRoles = await RoleManager.getAll(userQueries, ruleFiltersQuery, page, limit);
        ResponseHandler.success<RoleDTO[]>(res, resRoles);
    }

    static async getByRoleId(_req: Request, res: Response) {
        const { ruleFiltersQuery } = RoleController.extractRoleQueries(_req);
        const { roleId } = _req.params as { [key: string]: string };
        const foundRole = await RoleManager.findByRoleId(roleId, ruleFiltersQuery);
        ResponseHandler.success(res, foundRole);
    }

    static async getByDigitalIdentityUniqueId(_req: Request, res: Response) {
        const { ruleFiltersQuery } = RoleController.extractRoleQueries(_req);
        const foundRole = await RoleManager.findByDigitalIdentity(_req.params.digitalIdentityUniqueId, ruleFiltersQuery);
        ResponseHandler.success(res, foundRole);
    }

    static async getByGroupId(_req: Request, res: Response) {
        const { isDirect, page, limit, ruleFiltersQuery } = RoleController.extractRoleQueries(_req);

        const resRoles = await RoleManager.findByGroup(_req.params.groupId, ruleFiltersQuery, isDirect, page, limit);
        ResponseHandler.success(res, resRoles);
    }

    static async getUnderHierarchy(_req: Request, res: Response) {
        const { isDirect, page, limit, ruleFiltersQuery } = RoleController.extractRoleQueries(_req);
        const { hierarchy } = _req.params as { [key: string]: string };

        const resRoles = await RoleManager.findUnderHierarchy(hierarchy, ruleFiltersQuery, isDirect, page, limit);
        ResponseHandler.success(res, resRoles);
    }
}

export default RoleController;
