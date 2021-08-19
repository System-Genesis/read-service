import * as mongoose from 'mongoose';
import { Types } from 'mongoose';
import IGroup from './group.interface';
import { GroupModel } from './group.model';

export default class GroupRepository {
    protected model: mongoose.Model<IGroup>;

    constructor() {
        this.model = GroupModel;
    }

    private static DENORMALIZED_FIELDS = '-directEntities -directRoles';

    static createPagniationQuery = (_id: string) => {
        return {
            _id: { $gt: Types.ObjectId(_id) },
        };
    };

    // TODO: change all to and query

    findByQuery(query: any, excluders, expanded: boolean, page: number, pageSize: number): Promise<IGroup[]> {
        let findQuery = this.model
            .find({ $and: [{ ...query }, { ...excluders }] })
            .skip((page - 1) * pageSize)
            .limit(pageSize + 1);
        if (!expanded) {
            findQuery = findQuery.select(GroupRepository.DENORMALIZED_FIELDS);
        }
        return findQuery.lean<IGroup[]>().exec();
    }

    findById(groupId: string, excluders, expanded: boolean) {
        let findQuery = this.model.findOne({ _id: groupId, ...excluders });
        if (!expanded) {
            findQuery = findQuery.select(GroupRepository.DENORMALIZED_FIELDS);
        }
        return findQuery.lean<IGroup>().exec();
    }

    findByHierarchy(hierarchyToQuery: string, excluders, expanded: boolean): Promise<IGroup> {
        const hierarchyPathArr = hierarchyToQuery.split('/');
        const groupNameQuery = hierarchyPathArr.pop();
        const hierarchyWithoutGroup = hierarchyPathArr.join('/');
        let findQuery = this.model.findOne({
            hierarchy: hierarchyWithoutGroup,
            name: groupNameQuery,
            ...excluders,
        });
        if (!expanded) {
            findQuery = findQuery.select(GroupRepository.DENORMALIZED_FIELDS);
        }
        return findQuery.lean<IGroup>().exec();
    }

    // async getAncestors(groupId: string) {
    //     const groupsWithAncestors = await this.model
    //         .aggregate([
    //             { $match: { _id: Types.ObjectId(groupId) } },
    //             {
    //                 $graphLookup: {
    //                     from: 'organizationGroupsDNs',
    //                     startWith: { $toObjectId: '$directGroup' },
    //                     connectFromField: 'directGroup',
    //                     connectToField: '_id',
    //                     as: 'ancestors',
    //                     // depthField: 'depth',
    //                     maxDepth: 100,
    //                 },
    //             },
    //             // { $unwind: '$ancestors' },
    //             // { $sort: { depth: 1 } },
    //             // { $project: { _id: 1 } },
    //         ])
    //         .exec();
    //     return groupsWithAncestors;
    // }
}
