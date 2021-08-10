import { Request, Response } from 'express';
// import * as qs from 'qs';
import { Types } from 'mongoose';
import GroupManager from './group.manager';
import { RuleFilter } from '../shared/types';
import { extractUserQueries } from '../shared/filterQueries';
import { groupQueries } from './utils/types';
import { extractFilters, mapFieldQueryFunc } from './utils/queryParsers';

class GroupController {
    static entityManager: GroupManager = new GroupManager();

    static extractGroupQueries(_req: Request) {
        const { expanded, pageNum, pageSize, direct, ruleFilters, ...userQueries } = _req.query as { [key: string]: string };
        const isExpanded = expanded === 'true';
        const page = parseInt(pageNum, 10);
        const limit = parseInt(pageSize, 10);

        const ruleFiltersQuery = typeof ruleFilters === 'string' ? JSON.parse(ruleFilters) : ruleFilters;
        const isDirect = typeof direct === 'string' ? direct === 'true' : !!direct;
        return { isDirect, isExpanded, page, limit, ruleFiltersQuery, userQueries };
    }

    static async getAll(_req: Request, res: Response) {
        const { isExpanded, ruleFiltersQuery, page, limit, userQueries } = GroupController.extractGroupQueries(_req);
        const groups = await GroupManager.getAll(userQueries, ruleFiltersQuery, isExpanded, page, limit);
        res.status(200).send(groups);
    }

    static async getById(_req: Request, res: Response) {
        const { isExpanded, ruleFiltersQuery } = GroupController.extractGroupQueries(_req);
        const { id } = _req.params as { [key: string]: string };
        const groups = await GroupManager.findById(id, ruleFiltersQuery, isExpanded);
        res.status(200).send(groups);
    }

    static async getByHierarchy(_req: Request, res: Response) {
        const { isExpanded, ruleFiltersQuery } = GroupController.extractGroupQueries(_req);
        const { hierarchy } = _req.params as { [key: string]: string };
        const groups = await GroupManager.findByHierarchy(hierarchy, ruleFiltersQuery, isExpanded);
        res.status(200).send(groups);
    }

    static async getChildren(_req: Request, res: Response) {
        const { isExpanded, ruleFiltersQuery, isDirect, page, limit } = GroupController.extractGroupQueries(_req);
        const { id } = _req.params as { [key: string]: string };
        const groups = await GroupManager.getChildren(id, ruleFiltersQuery, isDirect, isExpanded, page, limit);
        res.status(200).send(groups);
    }
}

export default GroupController;
