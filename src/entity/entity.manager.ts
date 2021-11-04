/* eslint-disable no-underscore-dangle */
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
import { ProfilePictureData } from './pictures/pictureSchema';
import * as s3Handler from '../utils/pictures/s3Handler';

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
        ['ids', 'id'],
        ['updatedFrom', 'updatedAt'],
        ['entityType', 'entityType'],
        ['rank', 'rank'],
        ['digitalIdentities.source', 'digitalIdentities.source'],
        ['status', 'status'],
    ]);

    static async getAll(userQueries: EntityQueries, scopeExcluders: RuleFilter[], expanded: boolean = false, page: number, pageSize: number) {
        const scopeExcluder = extractScopesQuery(scopeExcluders, EntityManager.getDotField);
        const unAliasedQuery = extractAliasesUserQueries(userQueries, mapQueryValueAlias);
        const transformedQuery = extractUserQueries<EntityQueries>(unAliasedQuery, EntityManager.mapFieldName, mapFieldQueryFunc);

        const entities = await EntityManager.entityRepository.find(transformedQuery, scopeExcluder, expanded, page, pageSize);
        const { paginatedResults, nextPage } = pageWrapper(entities, pageSize);
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
        const scopeExcluder = extractScopesQuery(scopeExcluders, EntityManager.getDotField);
        const foundEntity = await EntityManager.entityRepository.findByRole(roleId, scopeExcluder, expanded);
        if (!foundEntity) {
            throw new ApiErrors.NotFoundError();
        }
        return foundEntity;
    }

    static async findByDigitalIdentity(uniqueId: string, scopeExcluders: RuleFilter[], expanded: boolean = false) {
        const scopeExcluder = extractScopesQuery(scopeExcluders, EntityManager.getDotField);
        const foundEntity = await EntityManager.entityRepository.findByUniqueId(uniqueId, scopeExcluder, expanded);
        if (!foundEntity) {
            throw new ApiErrors.NotFoundError();
        }
        return foundEntity;
    }

    static async findUnderGroup(groupID: string, scopeExcluders: RuleFilter[], expanded: boolean = false, page: number, pageSize: number) {
        const scopeExcluder = extractScopesQuery(scopeExcluders, EntityManager.getDotField);
        const entities = await EntityManager.entityRepository.findUnderGroup(groupID, scopeExcluder, expanded, page, pageSize);
        const { paginatedResults, nextPage } = pageWrapper(entities, pageSize);
        return paginatedResults;
    }

    static async findUnderHierarchy(hierarchy: string, scopeExcluders: RuleFilter[], expanded: boolean = false, page: number, pageSize: number) {
        const scopeExcluder = extractScopesQuery(scopeExcluders, EntityManager.getDotField);
        const entities = await EntityManager.entityRepository.findUnderHierarchy(hierarchy, scopeExcluder, expanded, page, pageSize);
        const { paginatedResults, nextPage } = pageWrapper(entities, pageSize);
        return paginatedResults;
    }

    static async getPictureByIdentifier(identifier: string, scopeExcluders: RuleFilter[]) {
        const scopeExcluder = extractScopesQuery(scopeExcluders, EntityManager.getDotField);
        const foundEntity = await EntityManager.entityRepository.findByIdentifier(identifier, scopeExcluder, false);
        if (!foundEntity) {
            throw new ApiErrors.NotFoundError();
        }

        const foundPic: any = await EntityManager.entityRepository.getPictureMetaData(identifier);
        const { path } = foundPic.pictures.profile.meta;

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
