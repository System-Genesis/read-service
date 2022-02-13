import { Request, Response } from 'express';
import { Readable } from 'stream';
import * as mongoose from 'mongoose';
import { EntityDTO } from './entity.DTO';
import ResponseHandler from '../shared/BaseController';

import EntityManager from './entity.manager';
import { pickCertainFields, sanitizeUndefined, splitQueryValue, splitQueryValues } from '../utils/utils';

class EntityController {
    static entityManager: EntityManager = new EntityManager();

    // TODO (M): move into env - later use that in queries map
    static QueriesToSplit = [
        'akaUnit',
        'rank',
        'ids',
        'personalNumbers',
        'identityCards',
        'digitalIdentities.uniqueIds',
        'digitalIdentity.source',
        'entityType',
        'jobTitle',
    ];

    // TODO: extractQueries in middleware?
    // TODO (M): remove underscore in req and userQueries
    static extractEntityQueries(_req: Request) {
        // TODO (M): find strict type that fits
        const { expanded, page, pageSize, ruleFilters, direct, ..._userQueries } = _req.query as { [key: string]: any | any[] };
        // TODO (M): isExpanded unnecessary with joi transformation
        const isExpanded = typeof expanded === 'string' ? expanded === 'true' : !!expanded;
        // TODO (M): should be unnecessary with joi transformation
        const pageNum = parseInt(page as string, 10);
        const limit = parseInt(pageSize as string, 10);
        // TODO (M): consider remove (leftover from querystring)
        let ruleFiltersQuery = typeof ruleFilters === 'string' ? JSON.parse(ruleFilters) : ruleFilters;
        // TODO (M): move [] upwards
        ruleFiltersQuery = ruleFiltersQuery || [];
        // TODO (M): keep spaces between lines that are not dependant
        let splitQueries = pickCertainFields(_userQueries, EntityController.QueriesToSplit);
        splitQueries = splitQueryValues(splitQueries);
        // TODO (M): again, move into joi
        const isDirect = typeof direct === 'string' ? direct === 'true' : !!direct;
        // const userQueries = convertCaseInsensitive(_userQueries, ['source', 'expanded']);

        const userQueries = { ..._userQueries, ...splitQueries };
        // TODO (M): move into manager (perhaps queries parser function)
        userQueries.ids = userQueries.ids?.map((s) => mongoose.Types.ObjectId(s));
        // TODO (M): why sanitation here? how come fields are undefined?
        sanitizeUndefined(userQueries);
        // TODO: (M): dont use type infer, define strict type
        return { isDirect, isExpanded, page: pageNum, limit, ruleFiltersQuery, userQueries };
    }

    static async getAll(_req: Request, res: Response) {
        // TODO (M): consider get only defined arguments from extraction instead of destruct manually
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
        // TODO (M): use types for params of each method (anywhere necessary?)
        const { identifier } = _req.params as { [key: string]: string };
        const entity = await EntityManager.findByIdentifier(identifier, ruleFiltersQuery, isExpanded);
        ResponseHandler.success(res, entity);
    }

    static async getByOrgAndEmpNum(_req: Request, res: Response) {
        const { isExpanded, ruleFiltersQuery } = EntityController.extractEntityQueries(_req);
        const { employeeNumber, organization } = _req.params as { [key: string]: string };
        const entity = await EntityManager.findByOrgAndEmpNum(organization, employeeNumber, ruleFiltersQuery, isExpanded);
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
