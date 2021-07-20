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

    async getById(groupId: string) {
        // const found = this.model.findOne({ id: groupId }).exec();
        const groupsWithChildren = await this.model
            .aggregate([
                { $match: { id: groupId } },
                {
                    $graphLookup: {
                        from: 'organizationGroups',
                        startWith: '$id',
                        connectFromField: 'id',
                        connectToField: 'directGroup',
                        as: 'children',
                        maxDepth: 100,
                    },
                },
            ])
            .exec();
        if (!groupsWithChildren || groupsWithChildren.length !== 1) throw new Error();
        const [groupWithChildren] = groupsWithChildren;
        // groupWithChildren = Object.assign(groupWithChildren, { hierarchy, ancestors: hierarchyIds });
        return groupWithChildren;
    }
}
