import { Request, Response } from 'express';
import { GroupDTO } from './group.DTO';
import ResponseHandler from '../shared/BaseController';
import GroupManager from './group.manager';
import { sanitizeUndefined, splitQueryValue } from '../utils/utils';

class GroupController {
    static entityManager: GroupManager = new GroupManager();

    static extractGroupQueries(_req: Request) {
        const { expanded, page, pageSize, direct, ruleFilters, ...userQueries } = _req.query as { [key: string]: string };
        const isExpanded = expanded === 'true';
        const pageNum = parseInt(page, 10);
        const limit = parseInt(pageSize, 10);
        let ruleFiltersQuery = typeof ruleFilters === 'string' ? JSON.parse(ruleFilters) : ruleFilters;
        ruleFiltersQuery = ruleFiltersQuery || [];
        userQueries.akaUnit = splitQueryValue(userQueries.akaUnit);
        userQueries.source = splitQueryValue(userQueries.source);
        const isDirect = typeof direct === 'string' ? direct === 'true' : !!direct;
        sanitizeUndefined(userQueries);
        return { isDirect, isExpanded, page: pageNum, limit, ruleFiltersQuery, userQueries };
    }

    static async getAll(_req: Request, res: Response) {
        const { isExpanded, ruleFiltersQuery, page, limit, userQueries } = GroupController.extractGroupQueries(_req);
        const groups = await GroupManager.getAll(userQueries, ruleFiltersQuery, isExpanded, page, limit);
        ResponseHandler.success<GroupDTO[]>(res, groups);
    }

    static async getById(_req: Request, res: Response) {
        const { isExpanded, ruleFiltersQuery } = GroupController.extractGroupQueries(_req);
        const { id } = _req.params as { [key: string]: string };
        const group = await GroupManager.findById(id, ruleFiltersQuery, isExpanded);
        ResponseHandler.success<GroupDTO>(res, group);
    }

    static async getByHierarchy(_req: Request, res: Response) {
        const { isExpanded, ruleFiltersQuery } = GroupController.extractGroupQueries(_req);
        const { hierarchy } = _req.params as { [key: string]: string };
        const groups = await GroupManager.findByHierarchy(hierarchy, ruleFiltersQuery, isExpanded);
        ResponseHandler.success<GroupDTO>(res, groups);
    }

    static async getChildren(_req: Request, res: Response) {
        const { isExpanded, ruleFiltersQuery, isDirect, page, limit } = GroupController.extractGroupQueries(_req);
        const { id } = _req.params as { [key: string]: string };
        const groups = await GroupManager.getChildren(id, ruleFiltersQuery, isDirect, isExpanded, page, limit); // TODO: doesnt work?
        ResponseHandler.success<GroupDTO[]>(res, groups);
    }

    static async getPrefixByGroupId(_req: Request, res: Response) {
        const { id } = _req.params;
        const diPrefix = await GroupManager.getPrefixByGroupId(id);
        res.json({ diPrefix });
    }
}

export default GroupController;
