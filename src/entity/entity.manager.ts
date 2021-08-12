/* eslint-disable no-underscore-dangle */
import EntityRepository from './entity.repository';
import RoleRepository from '../role/role.repository';
import DigitalIdentityRepository from '../digitalIdentity/digitalIdentity.repository';
import { EntityQueries, RequestQueryFields } from './utils/types';
import { mapFieldQueryFunc } from './utils/queryParsers';
import { extractUserQueries } from '../shared/filterQueries';
import { extractScopesQuery } from '../shared/repository.scope.excluders';
import pageWrapper from '../shared/pageWrapper';
import { EntityTypes, RuleFilter } from '../shared/types';

import * as ApiErrors from '../core/ApiErrors';

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
        const transformedQuery = extractUserQueries<EntityQueries>(userQueries, EntityManager.mapFieldName, mapFieldQueryFunc);

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
        return foundEntity;
    }

    static async findByRole(roleId: string, scopeExcluders: RuleFilter[], expanded: boolean = false) {
        const scopeExcluder = extractScopesQuery(scopeExcluders, EntityManager.getDotField);
        const foundEntity = EntityManager.entityRepository.findByRole(roleId, scopeExcluder, expanded);
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
        const foundPic = await EntityManager.entityRepository.getPictureMetaData(identifier);
        const { path } = foundPic;
        return paginatedResults;
    }
}

export default EntityManager;
