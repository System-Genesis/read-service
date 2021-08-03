import * as mongoose from 'mongoose';
import IGroup from './group.interface';
import { GroupModel } from './group.model';

export default class GroupRepository {
    protected model: mongoose.Model<IGroup & mongoose.Document>;

    constructor() {
        this.model = GroupModel;
    }

    private static DENORMALIZED_FIELDS = '-directEntities -directRoles';

    ancestorsToHierarchy = (ancestors: any[]) => {
        const hierarchyIds = ancestors.map((ancestor) => ancestor.id);
        const hierarchy = ancestors.map((ancestor) => ancestor.name).join('/');
        return { hierarchy, hierarchyIds };
    };

    findByQuery(query: any, excluders, expanded?: boolean) {
        let findQuery = this.model.find({ query, ...excluders });
        if (!expanded) {
            findQuery = findQuery.select(GroupRepository.DENORMALIZED_FIELDS);
        }
        return findQuery.lean<IGroup[]>().exec();
    }

    findById(groupId: string, excluders, expanded?: boolean) {
        let findQuery = this.model.findOne({ id: groupId, ...excluders });
        if (!expanded) {
            findQuery = findQuery.select(GroupRepository.DENORMALIZED_FIELDS);
        }
        return findQuery.lean<IGroup>().exec();
    }

    findUnderHierarchy(hierarchyToQuery: string, excluders, expanded?: boolean): Promise<IGroup[]> {
        let findQuery = this.model.find({ hierarchy: { $regex: `^${hierarchyToQuery}`, $options: 'i' }, ...excluders });
        if (!expanded) {
            findQuery = findQuery.select(GroupRepository.DENORMALIZED_FIELDS);
        }
        return findQuery.lean<IGroup[]>().exec();
    }

    // async getAncestorsFromGroup(groupId: string) {
    //     const groupsWithAncestors = await this.model
    //         .aggregate([
    //             { $match: { id: groupId } },
    //             {
    //                 $graphLookup: {
    //                     from: 'organizationGroupsDNs',
    //                     startWith: '$directGroup',
    //                     connectFromField: 'directGroup',
    //                     connectToField: 'id',
    //                     as: 'ancestors',
    //                     depthField: 'depth',
    //                     maxDepth: 100,
    //                 },
    //             },
    //             { $unwind: '$ancestors' },
    //             { $sort: { depth: 1 } },
    //             { $project: { _id: 1 } },
    //         ])
    //         .exec();

    //     if (!groupsWithAncestors || groupsWithAncestors.length !== 1) throw new Error();
    //     let [groupWithAncestors] = groupsWithAncestors;
    //     const { hierarchy, hierarchyIds } = this.ancestorsToHierarchy(groupWithAncestors.ancestors);
    //     groupWithAncestors = Object.assign(groupWithAncestors, { hierarchy, ancestors: hierarchyIds });
    //     return hierarchyIds;
    // }

    // async getById(groupId: string) {
    //     // const found = this.model.findOne({ id: groupId }).exec();
    //     const groupsWithChildren = await this.model
    //         .aggregate([
    //             { $match: { id: groupId } },
    //             {
    //                 $graphLookup: {
    //                     from: 'organizationGroups',
    //                     startWith: '$id',
    //                     connectFromField: 'id',
    //                     connectToField: 'directGroup',
    //                     as: 'children',
    //                     maxDepth: 100,
    //                 },
    //             },
    //         ])
    //         .exec();
    //     if (!groupsWithChildren || groupsWithChildren.length !== 1) throw new Error();
    //     const [groupWithChildren] = groupsWithChildren;
    //     // groupWithChildren = Object.assign(groupWithChildren, { hierarchy, ancestors: hierarchyIds });
    //     return groupWithChildren;
    // }
}
