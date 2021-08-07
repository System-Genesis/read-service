/* eslint-disable no-underscore-dangle */
import RoleRepository from './role.repository';
import * as ApiErrors from '../core/ApiErrors';
import DigitalIdentityRepository from '../digitalIdentity/digitalIdentity.repository';
import { extractUserQueries } from '../shared/filterQueries';
import { extractScopesQuery } from '../shared/repository.scope.excluders';
import pageWrapper from '../shared/pageWrapper';
import { roleQueries } from './utils/types';
import { mapFieldQueryFunc } from './utils/queryParsers';
import { EntityTypes, RuleFilter } from '../shared/types';

class RoleManager {
    static roleRepository: RoleRepository = new RoleRepository();

    static getDotField = new Map<EntityTypes, any>([[EntityTypes.ROLE, '']]);

    static mapFieldName = new Map<string, string>([['updatedFrom', 'updatedAt']]);

    static async getAll(userQueries: roleQueries, scopeExcluders: RuleFilter[], page: number | string, pageSize: number) {
        const scopeExcluder = extractScopesQuery(scopeExcluders, RoleManager.getDotField);
        const transformedQuery = extractUserQueries(userQueries, RoleManager.mapFieldName, mapFieldQueryFunc);
        const roles = await RoleManager.roleRepository.findByQuery(transformedQuery, scopeExcluder, page, pageSize);
        const { paginatedResults, nextPage } = pageWrapper(roles, pageSize);
        return { roles: paginatedResults, nextPage };
    }

    static async findByRoleId(roleId: string, scopeExcluders: RuleFilter[]) {
        const scopeExcluder = extractScopesQuery(scopeExcluders, RoleManager.getDotField);
        const foundRole = await RoleManager.roleRepository.findByRoleId(roleId, scopeExcluder);
        if (!foundRole) {
            throw new ApiErrors.NotFoundError();
        }
        return foundRole;
    }

    static async findByDigitalIdentity(uniqueId: string, scopeExcluders: RuleFilter[]) {
        const scopeExcluder = extractScopesQuery(scopeExcluders, RoleManager.getDotField);
        const foundRole = await RoleManager.roleRepository.findByDigitalIdentity(uniqueId, scopeExcluder);
        if (!foundRole) {
            throw new ApiErrors.NotFoundError();
        }
        return foundRole;
    }

    static async findByGroup(groupId: string, scopeExcluders: RuleFilter[], direct: boolean = true, page: number | string, pageSize: number) {
        const scopeExcluder = extractScopesQuery(scopeExcluders, RoleManager.getDotField);
        let roles;
        if (direct) {
            roles = await RoleManager.roleRepository.findInGroupId(groupId, scopeExcluder, page, pageSize);
        } else {
            roles = await RoleManager.roleRepository.findUnderGroupId(groupId, scopeExcluder, page, pageSize);
        }
        const { paginatedResults, nextPage } = pageWrapper(roles, pageSize);
        return { roles: paginatedResults, nextPage };
    }

    static async findUnderHierarchy(groupId: string, scopeExcluders: RuleFilter[], direct: boolean = true, page: number | string, pageSize: number) {
        const scopeExcluder = extractScopesQuery(scopeExcluders, RoleManager.getDotField);
        const roles = await RoleManager.roleRepository.findUnderHierarchy(groupId, scopeExcluder, page, pageSize);
        const { paginatedResults, nextPage } = pageWrapper(roles, pageSize);
        return { roles: paginatedResults, nextPage };
    }
}
export default RoleManager;
