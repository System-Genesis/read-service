/* eslint-disable no-underscore-dangle */
import * as mongoose from 'mongoose';
import EntityRepository from './entity.repository';
import RoleRepository from '../role/role.repository';
import DigitalIdentityRepository from '../digitalIdentity/digitalIdentity.repository';
import { EntityQueries, RequestQueryFields } from './types/types';
import { mapFieldQueryFunc, mapQueryValueAlias } from '../shared/queryParsers';
import { extractUserQueries, extractAliasesUserQueries } from '../shared/filterQueries';
import { extractScopesQuery } from '../shared/scopeExcluders';
import pageWrapper from '../shared/pageWrapper';
import { EntityTypes, RuleFilter } from '../shared/types';

import * as ApiErrors from '../core/ApiErrors';
import { pictures } from './pictures/pictureSchema';
import * as s3Handler from '../utils/pictures/s3Handler';
import { IEntity } from './entity.interface';

class EntityManager {
    static roleRepository: RoleRepository = new RoleRepository();

    static digitalIdentityRepository: DigitalIdentityRepository = new DigitalIdentityRepository();

    static entityRepository: EntityRepository = new EntityRepository();

    static getDotField = new Map<EntityTypes, any>([
        [EntityTypes.ENTITY, ''],
        [EntityTypes.DI, 'digitalIdentities.'],
        [EntityTypes.ROLE, 'digitalIdentities.role.'],
    ]);

    static mapFieldName = new Map<string, string>([
        ['ids', '_id'],
        ['updatedFrom', 'updatedAt'],
        ['entityType', 'entityType'],
        ['rank', 'rank'],
        ['digitalIdentity.source', 'digitalIdentities.source'],
    ]);

    static async getAll(
        userQueries: EntityQueries,
        scopeExcluders: RuleFilter[],
        expanded: boolean = false,
        stream: boolean = false,
        page: number,
        pageSize: number,
    ): Promise<IEntity[] | mongoose.QueryCursor<IEntity>> {
        const scopeExcluder = extractScopesQuery(scopeExcluders, EntityManager.getDotField);
        const unAliasedQuery = extractAliasesUserQueries(userQueries, mapQueryValueAlias);
        const transformedQuery = extractUserQueries<EntityQueries>(unAliasedQuery, EntityManager.mapFieldName, mapFieldQueryFunc);

        if (stream) {
            return new Promise((resolve, reject) => {
                const entities = EntityManager.entityRepository.find(transformedQuery, scopeExcluder, expanded, stream, page, pageSize);
                resolve(entities as mongoose.QueryCursor<IEntity>);
            });
        }
        const entities = await EntityManager.entityRepository.find(transformedQuery, scopeExcluder, expanded, stream, page, pageSize);
        const { paginatedResults, nextPage } = pageWrapper(entities as any[], pageSize);
        return paginatedResults;
    }

    static async findById(id: string, scopeExcluders: RuleFilter[], expanded: boolean = false) {
        const scopeExcluder = extractScopesQuery(scopeExcluders, EntityManager.getDotField);
        const entity = await EntityManager.entityRepository.findById(id, scopeExcluder, expanded);
        if (!entity) {
            throw new ApiErrors.NotFoundError();
        }
        return entity;
    }

    static async findByIdentifier(identifier: string, scopeExcluders: RuleFilter[], expanded: boolean = false) {
        const scopeExcluder = extractScopesQuery(scopeExcluders, EntityManager.getDotField);
        const foundEntity = await EntityManager.entityRepository.findByIdentifier(identifier, scopeExcluder, expanded);
        if (!foundEntity) {
            throw new ApiErrors.NotFoundError();
        }
        return foundEntity;
    }

    static async findByRole(roleId: string, scopeExcluders: RuleFilter[], expanded: boolean = false) {
        const roleIdLowerCase = roleId.toLowerCase();
        const scopeExcluder = extractScopesQuery(scopeExcluders, EntityManager.getDotField);
        const foundEntity = await EntityManager.entityRepository.findByRole(roleIdLowerCase, scopeExcluder, expanded);
        if (!foundEntity) {
            throw new ApiErrors.NotFoundError();
        }
        return foundEntity;
    }

    static async findByDigitalIdentity(uniqueId: string, scopeExcluders: RuleFilter[], expanded: boolean = false) {
        const uniqueIdLowerCase = uniqueId.toLowerCase();
        const scopeExcluder = extractScopesQuery(scopeExcluders, EntityManager.getDotField);
        const foundEntity = await EntityManager.entityRepository.findByUniqueId(uniqueIdLowerCase, scopeExcluder, expanded);
        if (!foundEntity) {
            throw new ApiErrors.NotFoundError();
        }
        return foundEntity;
    }

    static async findUnderGroup(
        groupID: string,
        scopeExcluders: RuleFilter[],
        direct: boolean = true,
        expanded: boolean = false,
        page: number,
        pageSize: number,
    ) {
        const scopeExcluder = extractScopesQuery(scopeExcluders, EntityManager.getDotField);
        let entities;
        if (direct) {
            entities = await EntityManager.entityRepository.findInGroupId(groupID, scopeExcluder, expanded, page, pageSize);
        } else {
            entities = await EntityManager.entityRepository.findUnderGroup(groupID, scopeExcluder, expanded, page, pageSize);
        }
        const { paginatedResults, nextPage } = pageWrapper(entities, pageSize);
        return paginatedResults;
    }

    static async findUnderHierarchy(
        hierarchy: string,
        scopeExcluders: RuleFilter[],
        direct: boolean = true,
        expanded: boolean = false,
        page: number,
        pageSize: number,
    ) {
        const scopeExcluder = extractScopesQuery(scopeExcluders, EntityManager.getDotField);
        let entities;
        if (direct) {
            entities = await EntityManager.entityRepository.findByHierarchy(hierarchy, scopeExcluder, expanded, page, pageSize);
        } else {
            entities = await EntityManager.entityRepository.findUnderHierarchy(hierarchy, scopeExcluder, expanded, page, pageSize);
        }
        const { paginatedResults, nextPage } = pageWrapper(entities, pageSize);
        return paginatedResults;
    }

    static async getPictureByIdentifier(identifier: string, scopeExcluders: RuleFilter[]) {
        const scopeExcluder = extractScopesQuery(scopeExcluders, EntityManager.getDotField);
        const foundEntity = await EntityManager.entityRepository.findByIdentifier(identifier, scopeExcluder, false);
        if (!foundEntity) {
            throw new ApiErrors.NotFoundError();
        }

        const pictures: any = await EntityManager.entityRepository.getPictureMetaData(identifier);

        if (!pictures || !pictures.pictures || !pictures.pictures.profile) {
            throw new ApiErrors.NotFoundError();
        }

        const { path } = pictures.pictures.profile.meta;

        try {
            const streamProvider = s3Handler.getProfilePicture(path);
            return streamProvider;
        } catch (err: any) {
            if (err.statusCode === 404) {
                throw new ApiErrors.NotFoundError();
            } else {
                throw new ApiErrors.InternalError();
            }
        }

        // return paginatedResults;
    }
}

export default EntityManager;
