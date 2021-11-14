import { mapQueryValueAlias, mapFieldQueryFunc } from '../shared/queryParsers';
import { extractAliasesUserQueries, extractUserQueries } from '../shared/filterQueries';
/* eslint-disable no-underscore-dangle */
import RoleRepository from './role.repository';
import * as ApiErrors from '../core/ApiErrors';
import { extractScopesQuery } from '../shared/scopeExcluders';
import pageWrapper from '../shared/pageWrapper';
import { roleQueries } from './types/types';
import { EntityTypes, RuleFilter } from '../shared/types';

class RoleManager {
    static roleRepository: RoleRepository = new RoleRepository();

    static getDotField = new Map<EntityTypes, any>([[EntityTypes.ROLE, '']]);

    static mapFieldName = new Map<string, string>([
        ['updatedFrom', 'updatedAt'],
        ['source', 'source'],
    ]);

    static async getAll(userQueries: roleQueries, scopeExcluders: RuleFilter[], page: number, pageSize: number) {
        const scopeExcluder = extractScopesQuery(scopeExcluders, RoleManager.getDotField);
        const unAliasedQuery = extractAliasesUserQueries(userQueries, mapQueryValueAlias);
        const transformedQuery = extractUserQueries(unAliasedQuery, RoleManager.mapFieldName, mapFieldQueryFunc);
        const roles = await RoleManager.roleRepository.findByQuery(transformedQuery, scopeExcluder, page, pageSize);
        const { paginatedResults, nextPage } = pageWrapper(roles, pageSize);
        return paginatedResults;
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

    static async findByGroup(groupId: string, scopeExcluders: RuleFilter[], direct: boolean = true, page: number, pageSize: number) {
        const scopeExcluder = extractScopesQuery(scopeExcluders, RoleManager.getDotField);
        let roles;
        if (direct) {
            roles = await RoleManager.roleRepository.findInGroupId(groupId, scopeExcluder, page, pageSize);
        } else {
            roles = await RoleManager.roleRepository.findUnderGroupId(groupId, scopeExcluder, page, pageSize);
        }
        const { paginatedResults, nextPage } = pageWrapper(roles, pageSize);
        return paginatedResults;
    }

    static async findUnderHierarchy(groupId: string, scopeExcluders: RuleFilter[], direct: boolean = true, page: number, pageSize: number) {
        const scopeExcluder = extractScopesQuery(scopeExcluders, RoleManager.getDotField);
        const roles = await RoleManager.roleRepository.findUnderHierarchy(groupId, scopeExcluder, page, pageSize);
        const { paginatedResults, nextPage } = pageWrapper(roles, pageSize);
        return paginatedResults;
    }
}
export default RoleManager;
