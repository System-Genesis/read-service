import GroupRepository from './group.repository';
import * as ApiErrors from '../core/ApiErrors';
import IGroup from './group.interface';
import { extractUserQueries } from '../shared/filterQueries';
import { extractScopesQuery } from '../shared/repository.scope.excluders';
import { RuleFilter, EntityTypes } from '../shared/types';
import { groupQueries } from './utils/types';
import { mapFieldQueryFunc } from './utils/queryParsers';

class GroupManager {
    static groupRepository: GroupRepository = new GroupRepository();

    static getDotField = new Map<EntityTypes, any>([[EntityTypes.GROUP, '']]);

    static mapFieldName = new Map<string, string>([['source', 'source']]);

    static async getAll(userQueries: groupQueries, scopeExcluders: RuleFilter[], expanded: boolean = false, pageNum: number = 0) {
        const scopeExcluder = extractScopesQuery(scopeExcluders, GroupManager.getDotField);
        const transformedQuery = extractUserQueries(userQueries, GroupManager.mapFieldName, mapFieldQueryFunc);
        const foundGroups = await GroupManager.groupRepository.findByQuery(transformedQuery, scopeExcluder, expanded);
        return foundGroups;
    }

    static async findById(id: string, scopeExcluders: RuleFilter[], expanded: boolean = false) {
        const scopeExcluder = extractScopesQuery(scopeExcluders, GroupManager.getDotField);
        const group = await GroupManager.groupRepository.findById(id, scopeExcluder, expanded);
        if (!group) {
            throw new ApiErrors.NotFoundError();
        }
        return group;
    }

    static async findByHierarchy(hierarchy: string, scopeExcluders: RuleFilter[], expanded: boolean = false) {
        const scopeExcluder = extractScopesQuery(scopeExcluders, GroupManager.getDotField);
        const foundGroups = await GroupManager.groupRepository.findUnderHierarchy(hierarchy, scopeExcluder, expanded);
        return foundGroups;
    }

    static async getChildren(groupId: string, scopeExcluders: RuleFilter[], direct: boolean = true, expanded: boolean = false) {
        let foundGroups;
        // const ancestors = await GroupManager.groupRepository.getAncestorsFromGroup('85ew4r3d3d');
        const scopeExcluder = extractScopesQuery(scopeExcluders, GroupManager.getDotField);
        if (direct) {
            foundGroups = await GroupManager.groupRepository.findByQuery({ directGroup: groupId }, scopeExcluder, expanded);
        } else {
            foundGroups = await GroupManager.groupRepository.findByQuery({ ancestors: groupId }, scopeExcluder, expanded);
        }
        return foundGroups;
    }
}
export default GroupManager;
