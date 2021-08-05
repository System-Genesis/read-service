import RoleRepository from './role.repository';
import * as ApiErrors from '../core/ApiErrors';
import DigitalIdentityRepository from '../digitalIdentity/digitalIdentity.repository';
import { extractUserQueries } from '../shared/filterQueries';
import { extractScopesQuery } from '../shared/repository.scope.excluders';
import { roleQueries } from './utils/types';
import { mapFieldQueryFunc } from './utils/queryParsers';
import { EntityTypes, RuleFilter } from '../shared/types';

class RoleManager {
    static roleRepository: RoleRepository = new RoleRepository();

    static getDotField = new Map<EntityTypes, any>([[EntityTypes.ROLE, '']]);

    static mapFieldName = new Map<string, string>([['updatedFrom', 'updatedAt']]);

    static async getAll(userQueries: roleQueries, scopeExcluders: RuleFilter[], pageNum: number = 0) {
        const scopeExcluder = extractScopesQuery(scopeExcluders, RoleManager.getDotField);
        const transformedQuery = extractUserQueries(userQueries, RoleManager.mapFieldName, mapFieldQueryFunc);
        const foundGroups = await RoleManager.roleRepository.findByQuery(transformedQuery, scopeExcluder);
        return foundGroups;
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

    static async findByGroup(groupId: string, scopeExcluders: RuleFilter[], direct: boolean = true, pageNum: number) {
        const scopeExcluder = extractScopesQuery(scopeExcluders, RoleManager.getDotField);
        let foundRole;
        if (direct) {
            foundRole = await RoleManager.roleRepository.findInGroupId(groupId, scopeExcluder);
        } else {
            foundRole = await RoleManager.roleRepository.findUnderGroupId(groupId, scopeExcluder);
        }
        return foundRole;
    }

    // static async findUnderHierarchy(groupId: string, direct: boolean = true, pageNum: number) {
    //     const foundRole = await RoleManager.roleRepository.findByGroupId(groupId);
    //     return foundRole;
    // }
}
export default RoleManager;
