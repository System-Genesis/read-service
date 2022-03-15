import { mapQueryValueAlias, mapFieldQueryFunc } from '../shared/queryParsers';
import { extractAliasesUserQueries, extractUserQueries } from '../shared/filterQueries';
import { digitalIdentityRepository } from './repository';
import * as ApiErrors from '../core/ApiErrors';
import { DigitalIdentityQueries } from './utils/types';
import { extractScopesQuery } from '../shared/scopeExcluders';
import pageWrapper from '../shared/pageWrapper';
import { EntityTypes, RuleFilter } from '../shared/types';

class DigitalIdentityManager {
    static getDotField = new Map<EntityTypes, any>([[EntityTypes.DI, '']]);

    static mapFieldName = new Map<string, string>([
        ['updatedFrom', 'updatedAt'],
        ['source', 'source'],
    ]);

    static async getAll(
        userQueries: DigitalIdentityQueries,
        scopeExcluders: RuleFilter[],
        expanded: boolean = false,
        page: number,
        pageSize: number,
    ) {
        const scopeExcluder = extractScopesQuery(scopeExcluders, DigitalIdentityManager.getDotField);
        const unAliasedQuery = extractAliasesUserQueries(userQueries, mapQueryValueAlias);
        const transformedQuery = extractUserQueries(unAliasedQuery, DigitalIdentityManager.mapFieldName, mapFieldQueryFunc);

        const foundDigitalIdentities = await digitalIdentityRepository.findByQuery(transformedQuery, scopeExcluder, expanded, page, pageSize);

        const { paginatedResults, nextPage } = pageWrapper(foundDigitalIdentities, pageSize);
        return paginatedResults;
    }

    static async findByUniqueId(uniqueId: string, scopeExcluders: RuleFilter[], expanded: boolean = false) {
        const uniqueIdLowerCase = uniqueId.toLowerCase();
        const scopeExcluder = extractScopesQuery(scopeExcluders, DigitalIdentityManager.getDotField);
        const foundDigitalIdentity = await digitalIdentityRepository.findByUniqueId(uniqueIdLowerCase, scopeExcluder, expanded);
        if (!foundDigitalIdentity) {
            throw new ApiErrors.NotFoundError();
        }
        return foundDigitalIdentity;
    }

    static async findByRoleId(roleId: string, scopeExcluders: RuleFilter[], expanded: boolean = false) {
        const roleIdLowerCase = roleId.toLowerCase();
        const scopeExcluder = extractScopesQuery(scopeExcluders, DigitalIdentityManager.getDotField);
        const foundDigitalIdentity = await digitalIdentityRepository.findByRoleId(roleIdLowerCase, scopeExcluder, expanded);
        if (!foundDigitalIdentity) {
            throw new ApiErrors.NotFoundError();
        }
        return foundDigitalIdentity;
    }
}
export default DigitalIdentityManager;
