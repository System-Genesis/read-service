import { Request, Response } from 'express';
// import * as qs from 'qs';

import GroupManager from './group.manager';
import { RuleFilter } from '../shared/types';
import { extractUserQueries } from '../shared/filterQueries';
import { groupQueries } from './utils/types';
import { extractFilters, mapFieldQueryFunc } from './utils/queryParsers';

class GroupController {
    static entityManager: GroupManager = new GroupManager();

    static extractGroupQueries(_req: Request) {
        const { expanded, page, direct } = _req.query as { [key: string]: string };
        const isExpanded = expanded === 'true';
        const isDirect = direct === 'true';
        const pageNum = parseInt(page, 10);

        let ruleFiltersQuery = _req.query.ruleFilters as RuleFilter[];
        ruleFiltersQuery = typeof ruleFiltersQuery === 'string' ? JSON.parse(ruleFiltersQuery) : ruleFiltersQuery;
        return { isExpanded, pageNum, ruleFiltersQuery, isDirect };
    }

    static async getAll(_req: Request, res: Response) {
        const { isExpanded, ruleFiltersQuery } = GroupController.extractGroupQueries(_req);
        const userQueries: groupQueries = extractFilters(_req.query as any);
        const groups = await GroupManager.getAll(userQueries, ruleFiltersQuery, isExpanded);
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
        const { isExpanded, ruleFiltersQuery, isDirect } = GroupController.extractGroupQueries(_req);
        const { id } = _req.params as { [key: string]: string };
        const groups = await GroupManager.getChildren(id, ruleFiltersQuery, isDirect, isExpanded);
        res.status(200).send(groups);
    }
}

export default GroupController;
