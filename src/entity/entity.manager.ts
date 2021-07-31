import IEntity from './entity.interface';
import IDenormalizedEntity from './denormal/entity.denormalized.interface';
import EntityRepository from './entity.repository';
import RoleRepository from '../role/role.repository';
import DigitalIdentityRepository from '../digitalIdentity/digitalIdentity.repository';
import EntityDenormalizedRepository from './entity.denormalized.repository';
import { extractUserQueries } from './utils/filterQueries';
import { extractScopesQuery } from './utils/repository.scope.excluders';
import { EntityTypes, RuleFilter, optionalQueries } from './utils/types';

import * as ApiErrors from '../core/ApiErrors';

class EntityManager {
    static roleRepository: RoleRepository = new RoleRepository();

    static digitalIdentityRepository: DigitalIdentityRepository = new DigitalIdentityRepository();

    static entityDenormalizedRepository: EntityDenormalizedRepository = new EntityDenormalizedRepository();

    static getDotFieldEntityDN = new Map<EntityTypes, any>([
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

    static async getAll(userQueries: optionalQueries, scopeExcluders: RuleFilter[], expanded: boolean = false, pageNum: number = 0) {
        const scopeExcluder = extractScopesQuery(scopeExcluders, EntityManager.getDotFieldEntityDN);
        const transformedQuery = extractUserQueries(userQueries, EntityManager.mapFieldName);

        const entities = await EntityManager.entityDenormalizedRepository.find(transformedQuery, scopeExcluder, expanded, pageNum, 10);

        return entities;
    }

    static async findById(id: string, scopeExcluders: RuleFilter[], expanded: boolean = false) {
        const scopeExcluder = extractScopesQuery(scopeExcluders, EntityManager.getDotFieldEntityDN);
        const entity = await EntityManager.entityDenormalizedRepository.findById(id, scopeExcluder, expanded);
        if (!entity) {
            throw new ApiErrors.NotFoundError();
        }
        return entity;
    }

    static async findByIdentifier(identifier: string, scopeExcluders: RuleFilter[], expanded: boolean = false) {
        const scopeExcluder = extractScopesQuery(scopeExcluders, EntityManager.getDotFieldEntityDN);
        const entities = await EntityManager.entityDenormalizedRepository.findByIdentifier(identifier, scopeExcluder, expanded);
        return entities;
    }

    static async findByRole(roleId: string, scopeExcluders: RuleFilter[], expanded: boolean = false) {
        const scopeExcluder = extractScopesQuery(scopeExcluders, EntityManager.getDotFieldEntityDN);
        const foundEntity = EntityManager.entityDenormalizedRepository.findByRole(roleId, scopeExcluder, expanded);
        if (!foundEntity) {
            throw new ApiErrors.NotFoundError();
        }
        return foundEntity;
    }

    static async findByDigitalIdentity(uniqueId: string, scopeExcluders: RuleFilter[], expanded: boolean = false) {
        const scopeExcluder = extractScopesQuery(scopeExcluders, EntityManager.getDotFieldEntityDN);
        const foundEntity = await EntityManager.entityDenormalizedRepository.findByUniqueId(uniqueId, scopeExcluder, expanded);
        if (!foundEntity) {
            throw new ApiErrors.NotFoundError();
        }
        return foundEntity;
    }

    static async findUnderGroup(groupID: string, scopeExcluders: RuleFilter[], expanded: boolean = false) {
        const scopeExcluder = extractScopesQuery(scopeExcluders, EntityManager.getDotFieldEntityDN);
        const foundEntities = await EntityManager.entityDenormalizedRepository.findUnderGroup(groupID, scopeExcluder, expanded);
        return foundEntities;
    }

    static async findUnderHierarchy(hierarchy: string, scopeExcluders: RuleFilter[], expanded: boolean = false) {
        const scopeExcluder = extractScopesQuery(scopeExcluders, EntityManager.getDotFieldEntityDN);
        const foundEntities = await EntityManager.entityDenormalizedRepository.findUnderHierarchy(hierarchy, scopeExcluder, expanded);
        return foundEntities;
    }
}

export default EntityManager;
