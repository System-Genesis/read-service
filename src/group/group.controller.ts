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
        const { expanded, page, limit, direct, ruleFilters, ...userQueries } = _req.query as { [key: string]: string };
        const isExpanded = expanded === 'true';
        const pageId: number | string = Types.ObjectId.isValid(page) ? page : 1;
        let pageSize = parseInt(limit, 10);
        pageSize = pageSize < 1000 ? pageSize : 1000;

        const ruleFiltersQuery = typeof ruleFilters === 'string' ? JSON.parse(ruleFilters) : ruleFilters;
        const isDirect = typeof direct === 'string' ? direct === 'true' : !!direct;
        return { isDirect, isExpanded, pageId, pageSize, ruleFiltersQuery, userQueries };
    }

    static async getAll(_req: Request, res: Response) {
        const { isExpanded, ruleFiltersQuery, pageId, pageSize, userQueries } = GroupController.extractGroupQueries(_req);
        const groups = await GroupManager.getAll(userQueries, ruleFiltersQuery, isExpanded, pageId, pageSize);
        res.status(200).send(groups);
    }

    static async getById(_req: Request, res: Response) {
        const { isExpanded, ruleFiltersQuery } = GroupController.extractGroupQueries(_req);
        const { id } = _req.params as { [key: string]: string };
        const groups = await GroupManager.findById(id, ruleFiltersQuery, isExpanded);
        res.status(200).send(groups);
    }

    static async getByHierarchy(_req: Request, res: Response) {
        const { isExpanded, ruleFiltersQuery, pageId, pageSize } = GroupController.extractGroupQueries(_req);
        const { hierarchy } = _req.params as { [key: string]: string };
        const groups = await GroupManager.findByHierarchy(hierarchy, ruleFiltersQuery, isExpanded, pageId, pageSize);
        res.status(200).send(groups);
    }

    static async getChildren(_req: Request, res: Response) {
        const { isExpanded, ruleFiltersQuery, isDirect, pageId, pageSize } = GroupController.extractGroupQueries(_req);
        const { id } = _req.params as { [key: string]: string };
        const groups = await GroupManager.getChildren(id, ruleFiltersQuery, isDirect, isExpanded, pageId, pageSize);
        res.status(200).send(groups);
    }
}

export default GroupController;
