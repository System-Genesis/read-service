import { Request, Response } from 'express';
import { Readable } from 'stream';
import * as mongoose from 'mongoose';
import { EntityDTO } from './entity.DTO';
import ResponseHandler from '../shared/BaseController';

import EntityManager from './entity.manager';
import { sanitizeUndefined, splitQueryValue } from '../utils/utils';

class EntityController {
    static entityManager: EntityManager = new EntityManager();

    // TODO: extractQueries in middleware?
    static extractEntityQueries(_req: Request) {
        const { expanded, page, pageSize, ruleFilters, direct, ..._userQueries } = _req.query as { [key: string]: any | any[] };

        const isExpanded = typeof expanded === 'string' ? expanded === 'true' : !!expanded;
        const pageNum = parseInt(page as string, 10);
        const limit = parseInt(pageSize as string, 10);
        let ruleFiltersQuery = typeof ruleFilters === 'string' ? JSON.parse(ruleFilters) : ruleFilters;
        ruleFiltersQuery = ruleFiltersQuery || [];
        _userQueries.rank = splitQueryValue(_userQueries.rank);
        _userQueries.ids = splitQueryValue(_userQueries.ids);
        _userQueries.ids = _userQueries.ids?.map((s) => mongoose.Types.ObjectId(s));
        _userQueries.entityType = splitQueryValue(_userQueries.entityType);
        _userQueries.jobTitle = splitQueryValue(_userQueries.jobTitle);
        _userQueries['digitalIdentity.source'] = splitQueryValue(_userQueries['digitalIdentity.source']);
        sanitizeUndefined(_userQueries);
        const isDirect = typeof direct === 'string' ? direct === 'true' : !!direct;
        // const userQueries = convertCaseInsensitive(_userQueries, ['source', 'expanded']);
        const userQueries = _userQueries;
        return { isDirect, isExpanded, page: pageNum, limit, ruleFiltersQuery, userQueries };
    }

    static async getAll(_req: Request, res: Response) {
        const { isExpanded, page, limit, ruleFiltersQuery, userQueries } = EntityController.extractEntityQueries(_req);
        const resEntities = await EntityManager.getAll(userQueries, ruleFiltersQuery, isExpanded, page, limit);
        ResponseHandler.success<EntityDTO[]>(res, resEntities);
    }

    static async getById(_req: Request, res: Response) {
        const { isExpanded, ruleFiltersQuery } = EntityController.extractEntityQueries(_req);
        const entity = await EntityManager.findById(_req.params.id, ruleFiltersQuery, isExpanded);
        ResponseHandler.success(res, entity);
    }

    static async getByIdentifier(_req: Request, res: Response) {
        const { isExpanded, ruleFiltersQuery } = EntityController.extractEntityQueries(_req);
        const { identifier } = _req.params as { [key: string]: string };
        const entity = await EntityManager.findByIdentifier(identifier, ruleFiltersQuery, isExpanded);
        ResponseHandler.success(res, entity);
    }

    static async getByDigitalIdentity(_req: Request, res: Response) {
        const { isExpanded, ruleFiltersQuery } = EntityController.extractEntityQueries(_req);
        const { digitalIdentityUniqueId } = _req.params as { [key: string]: string };

        const entity = await EntityManager.findByDigitalIdentity(digitalIdentityUniqueId, ruleFiltersQuery, isExpanded);
        ResponseHandler.success(res, entity);
    }

    static async getByRole(_req: Request, res: Response) {
        const { isExpanded, ruleFiltersQuery } = EntityController.extractEntityQueries(_req);
        const { roleId } = _req.params as { [key: string]: string };

        const entity = await EntityManager.findByRole(roleId, ruleFiltersQuery, isExpanded);
        ResponseHandler.success(res, entity);
    }

    static async getUnderGroup(_req: Request, res: Response) {
        const { isExpanded, page, isDirect, limit, ruleFiltersQuery } = EntityController.extractEntityQueries(_req);
        const { groupId } = _req.params as { [key: string]: string };

        const resEntities = await EntityManager.findUnderGroup(groupId, ruleFiltersQuery, isDirect, isExpanded, page, limit);
        ResponseHandler.success<EntityDTO[]>(res, resEntities);
    }

    static async getUnderHierarchy(_req: Request, res: Response) {
        const { isExpanded, page, limit, isDirect, ruleFiltersQuery } = EntityController.extractEntityQueries(_req);
        const { hierarchy } = _req.params as { [key: string]: string };

        const resEntities = await EntityManager.findUnderHierarchy(hierarchy, ruleFiltersQuery, isDirect, isExpanded, page, limit);
        ResponseHandler.success<EntityDTO[]>(res, resEntities);
    }

    static async getPictureByIdentifier(_req: Request, res: Response) {
        const { ruleFiltersQuery } = EntityController.extractEntityQueries(_req);
        const { identifier } = _req.params as { [key: string]: string };
        const streamProvider: Readable = await EntityManager.getPictureByIdentifier(identifier, ruleFiltersQuery);
        ResponseHandler.picture(res, streamProvider);
    }
}

export default EntityController;
