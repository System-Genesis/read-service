/* eslint-disable no-underscore-dangle */
import { entityRepository } from './repository';
import { digitalIdentityRepository } from '../digitalIdentity/repository';
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
        ['akaUnit', 'akaUnit'],
        ['digitalIdentity.source', 'digitalIdentities.source'],
        ['digitalIdentities.uniqueIds', 'digitalIdentities.uniqueId'],
        ['personalNumbers', 'personalNumber'],
        ['identityCards', 'identityCard'],
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
                const entities = entityRepository.find(transformedQuery, scopeExcluder, expanded, stream, page, pageSize);
                resolve(entities as mongoose.QueryCursor<IEntity>);
            });
        }
        const entities = await entityRepository.find(transformedQuery, scopeExcluder, expanded, stream, page, pageSize);
        const { paginatedResults, nextPage } = pageWrapper(entities as any[], pageSize);
        return paginatedResults;
    }

    static async findById(id: string, scopeExcluders: RuleFilter[], expanded: boolean = false) {
        const scopeExcluder = extractScopesQuery(scopeExcluders, EntityManager.getDotField);
        const entity = await entityRepository.findById(id, scopeExcluder, expanded);
        if (!entity) {
            throw new ApiErrors.NotFoundError();
        }
        return entity;
    }

    // TODO: refactor identifiers into manager (consider value object of identifier with it's trimZeros method)
    static async findByIdentifier(identifier: string, scopeExcluders: RuleFilter[], expanded: boolean = false) {
        const scopeExcluder = extractScopesQuery(scopeExcluders, EntityManager.getDotField);
        const foundEntity = await entityRepository.findByIdentifier(identifier, scopeExcluder, expanded);
        if (!foundEntity) {
            throw new ApiErrors.NotFoundError();
        }
        return foundEntity;
    }

    static async findByOrgAndEmpNum(organization: string, employeeNumber: string, scopeExcluders: RuleFilter[], expanded: boolean = false) {
        const scopeExcluder = extractScopesQuery(scopeExcluders, EntityManager.getDotField);
        const foundEntity = await entityRepository.findByOrgAndEmpNum(organization, employeeNumber, scopeExcluder, expanded);
        if (!foundEntity) {
            throw new ApiErrors.NotFoundError();
        }
        return foundEntity;
    }

    static async findByRole(roleId: string, scopeExcluders: RuleFilter[], expanded: boolean = false) {
        const roleIdLowerCase = roleId.toLowerCase();
        const scopeExcluder = extractScopesQuery(scopeExcluders, EntityManager.getDotField);
        const foundEntity = await entityRepository.findByRole(roleIdLowerCase, scopeExcluder, expanded);
        if (!foundEntity) {
            throw new ApiErrors.NotFoundError();
        }
        return foundEntity;
    }

    static async findByDigitalIdentity(uniqueId: string, scopeExcluders: RuleFilter[], expanded: boolean = false) {
        const uniqueIdLowerCase = uniqueId.toLowerCase();
        const scopeExcluder = extractScopesQuery(scopeExcluders, EntityManager.getDotField);
        const foundEntity = await entityRepository.findByUniqueId(uniqueIdLowerCase, scopeExcluder, expanded);
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
            entities = await entityRepository.findInGroupId(groupID, scopeExcluder, expanded, page, pageSize);
        } else {
            entities = await entityRepository.findUnderGroup(groupID, scopeExcluder, expanded, page, pageSize);
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
            entities = await entityRepository.findByHierarchy(hierarchy, scopeExcluder, expanded, page, pageSize);
        } else {
            entities = await entityRepository.findUnderHierarchy(hierarchy, scopeExcluder, expanded, page, pageSize);
        }
        const { paginatedResults, nextPage } = pageWrapper(entities, pageSize);
        return paginatedResults;
    }

    static async getPictureByIdentifier(identifier: string, scopeExcluders: RuleFilter[]) {
        const scopeExcluder = extractScopesQuery(scopeExcluders, EntityManager.getDotField);
        const foundEntity = await entityRepository.findByIdentifier(identifier, scopeExcluder, false);
        if (!foundEntity) {
            throw new ApiErrors.NotFoundError();
        }

        const pictures: any = await entityRepository.getPictureMetaData(identifier);

        if (!pictures || !pictures.pictures || !pictures.pictures.profile) {
            throw new ApiErrors.NotFoundError();
        }

        const { path } = pictures.pictures.profile.meta;

        try {
            const streamProvider = s3Handler.getProfilePicture(path);
            return streamProvider;
            // TODO: useful error type
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
