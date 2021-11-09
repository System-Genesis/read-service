/* eslint-disable no-underscore-dangle */
import GroupRepository from './group.repository';
import * as ApiErrors from '../core/ApiErrors';
import { extractUserQueries } from '../shared/filterQueries';
import { extractScopesQuery } from '../shared/scopeExcluders';
import { RuleFilter, EntityTypes } from '../shared/types';
import pageWrapper from '../shared/pageWrapper';
import { groupQueries } from './types/types';
import { mapFieldQueryFunc } from '../shared/queryParsers';

class GroupManager {
    static groupRepository: GroupRepository = new GroupRepository();

    static getDotField = new Map<EntityTypes, any>([[EntityTypes.GROUP, '']]);

    static mapFieldName = new Map<string, string>([['source', 'source']]);

    static async getAll(userQueries: groupQueries, scopeExcluders: RuleFilter[], expanded: boolean = false, page: number, pageSize: number) {
        const scopeExcluder = extractScopesQuery(scopeExcluders, GroupManager.getDotField);
        const transformedQuery = extractUserQueries(userQueries, GroupManager.mapFieldName, mapFieldQueryFunc);

        const foundGroups = await GroupManager.groupRepository.findByQuery(transformedQuery, scopeExcluder, expanded, page, pageSize);
        const { paginatedResults, nextPage } = pageWrapper(foundGroups, pageSize);
        return paginatedResults;
    }

    static async findById(id: string, scopeExcluders: RuleFilter[], expanded: boolean = false) {
        const scopeExcluder = extractScopesQuery(scopeExcluders, GroupManager.getDotField);
        const group = await GroupManager.groupRepository.findById(id, scopeExcluder, expanded);
        // const ancestors = await GroupManager.groupRepository.getAncestors(id);
        if (!group) {
            throw new ApiErrors.NotFoundError();
        }
        return group;
    }
    // TODO: figure out what query we want to implement

    static async findByHierarchy(hierarchy: string, scopeExcluders: RuleFilter[], expanded: boolean = false) {
        const scopeExcluder = extractScopesQuery(scopeExcluders, GroupManager.getDotField);
        const foundGroup = await GroupManager.groupRepository.findByHierarchy(hierarchy, scopeExcluder, expanded);
        if (!foundGroup) {
            throw new ApiErrors.NotFoundError();
        }
        return foundGroup;
    }

    static async getChildren(
        groupId: string,
        scopeExcluders: RuleFilter[],
        direct: boolean = true,
        expanded: boolean = false,
        page: number,
        pageSize: number,
    ) {
        let foundGroups;
        // const ancestors = await GroupManager.groupRepository.getAncestorsFromGroup('85ew4r3d3d');
        const scopeExcluder = extractScopesQuery(scopeExcluders, GroupManager.getDotField);
        if (direct) {
            foundGroups = await GroupManager.groupRepository.findByQuery({ directGroup: groupId }, scopeExcluder, expanded, page, pageSize);
        } else {
            foundGroups = await GroupManager.groupRepository.findByQuery({ ancestors: groupId }, scopeExcluder, expanded, page, pageSize);
        }
        const { paginatedResults, nextPage } = pageWrapper(foundGroups, pageSize);
        return paginatedResults;
    }
    static async getPrefixByGroupId(id: string) {
        const group = await GroupManager.groupRepository.findById(id, {}, false);
        if (!group) {
            throw new ApiErrors.NotFoundError('Group Not Found')
        }
<<<<<<< HEAD
        if (group.prefix) {
            return group.prefix
        }
        const groupWithPrefix = await GroupManager.groupRepository.findPrefixById(id);
        if (!groupWithPrefix) {
            throw new ApiErrors.NotFoundError('Group doesn`t have Prefix')
        }
        if (!groupWithPrefix.ancestor.prefix) {
            throw new ApiErrors.InternalError();
        }
        return groupWithPrefix.ancestor.prefix;
=======
        if (group.diPrefix) {
            return group.diPrefix;
        }
        const groupWithPrefix = await GroupManager.groupRepository.findPrefixById(id);
        if (!groupWithPrefix || groupWithPrefix.length === 0) {
            throw new ApiErrors.NotFoundError('Group doesn`t have prefix')
        }
        if (!groupWithPrefix[0].ancestors.diPrefix) {
            throw new ApiErrors.InternalError();
        }
        return groupWithPrefix[0].ancestors.diPrefix;
>>>>>>> 9d900c4e6274b573f2f7681ef9eccd9c6b35ea35

    }
}
export default GroupManager;
