import { Request, Response } from 'express';
import { Readable } from 'stream';

import * as fs from 'fs';
import mongoose, { QueryCursor } from 'mongoose';
import * as JSONStream from 'JSONStream';

import { EntityDTO } from './entity.DTO';
import ResponseHandler from '../shared/BaseController';

import EntityManager from './entity.manager';
import { pickCertainFields, sanitizeUndefined, splitQueryValue, splitQueryValues } from '../utils/utils';

import { IEntity } from './entity.interface';

class EntityController {
    static entityManager: EntityManager = new EntityManager();

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
    static extractEntityQueries(_req: Request) {
        const { expanded, stream, page, pageSize, ruleFilters, direct, ..._userQueries } = _req.query as { [key: string]: any | any[] };

        const isExpanded = typeof expanded === 'string' ? expanded === 'true' : !!expanded;
        const isStream = typeof stream === 'string' ? stream === 'true' : !!stream;
        const pageNum = parseInt(page as string, 10);
        const limit = parseInt(pageSize as string, 10);
        let ruleFiltersQuery = typeof ruleFilters === 'string' ? JSON.parse(ruleFilters) : ruleFilters;
        ruleFiltersQuery = ruleFiltersQuery || [];
        let splitQueries = pickCertainFields(_userQueries, EntityController.QueriesToSplit);
        splitQueries = splitQueryValues(splitQueries);
        const isDirect = typeof direct === 'string' ? direct === 'true' : !!direct;
        // const userQueries = convertCaseInsensitive(_userQueries, ['source', 'expanded']);
        const userQueries = { ..._userQueries, ...splitQueries };
        userQueries.ids = userQueries.ids?.map((s) => mongoose.Types.ObjectId(s));
        sanitizeUndefined(userQueries);
        return { isDirect, isStream, isExpanded, page: pageNum, limit, ruleFiltersQuery, userQueries };
    }

    static pipeToRes = (streamProvider: QueryCursor<IEntity>, res: Response): void => {
        // let countTotal = 0;

        streamProvider.pipe(JSONStream.stringify()).pipe(res);

        // // streamProvider.pipe(JSONStream.stringify());
        // streamProvider.on('data', (chunk) => {
        //     countTotal += 1;
        //     // res.write(`${JSON.stringify(chunk)}\r\n`);
        //     // res.write(JSON.stringify(`${chunk}`));
        //     res.write(JSON.stringify(chunk));
        // });

        // streamProvider.on('end', () => {
        //     console.log(`Total is: ${countTotal}`);
        //     res.end();
        // });
    };

    static async getAll(_req: Request, res: Response) {
        const { isExpanded, isStream, page, limit, ruleFiltersQuery, userQueries } = EntityController.extractEntityQueries(_req);
        const resEntities = await EntityManager.getAll(userQueries, ruleFiltersQuery, isExpanded, isStream, page, limit);
        if (isStream) {
            EntityController.pipeToRes(resEntities as QueryCursor<IEntity>, res);
        } else {
            ResponseHandler.success<EntityDTO[]>(res, resEntities as unknown as EntityDTO[]);
        }
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

    // TO DO:STREAM
    static async getUnderGroup(_req: Request, res: Response) {
        const { isExpanded, isStream, page, isDirect, limit, ruleFiltersQuery } = EntityController.extractEntityQueries(_req);
        const { groupId } = _req.params as { [key: string]: string };

        const resEntities = await EntityManager.findUnderGroup(groupId, ruleFiltersQuery, isDirect, isExpanded, page, limit);
        ResponseHandler.success<EntityDTO[]>(res, resEntities);
    }

    // TO DO: STREAM
    static async getUnderHierarchy(_req: Request, res: Response) {
        const { isExpanded, isStream, page, limit, isDirect, ruleFiltersQuery } = EntityController.extractEntityQueries(_req);
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
