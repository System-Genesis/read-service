import * as mongoose from 'mongoose';
import { IGroup } from './organizationGroup.interface';
import { GroupModel } from './organizationGroup.model';

export default class GroupRepository {
    protected model: mongoose.Model<IGroup & mongoose.Document>;

    constructor() {
        this.model = GroupModel;
    }

    // ancestorsToHierarchy = (ancestors: any[]) => {
    //     const hierarchyIds = ancestors.map((ancestor) => ancestor.id);
    //     const hierarchy = ancestors.map((ancestor) => ancestor.name).join('/');
    //     return { hierarchy, hierarchyIds };
    // };

    ancestorsToHierarchy = (ancestors: any[]) => {
        const hierarchyIds = ancestors.map((ancestor) => ancestor.id);
        const hierarchy = ancestors.map((ancestor) => ancestor.name).join('/');
        return { hierarchy, hierarchyIds };
    };

    // findByRoleId(roleId: string) {
    //     const findQuery = this.model.findOne({ roleId });
    //     return findQuery.lean().exec();
    // }

    async getAncestorsFromGroup(groupId: string) {
        const groupsWithAncestors = await this.model
            .aggregate([
                { $match: { groupId } },
                {
                    $graphLookup: {
                        from: 'organizationGroups',
                        startWith: '$directGroup',
                        connectFromField: 'directGroup',
                        connectToField: 'id',
                        as: 'ancestors',
                        maxDepth: 100,
                    },
                },
            ])
            .exec();

        if (!groupsWithAncestors || groupsWithAncestors.length !== 1) throw new Error();
        let [groupWithAncestors] = groupsWithAncestors;
        const { hierarchy, hierarchyIds } = this.ancestorsToHierarchy(groupWithAncestors.ancestors);
        groupWithAncestors = Object.assign(groupWithAncestors, { hierarchy, ancestors: hierarchyIds });
        return hierarchyIds;
    }

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
