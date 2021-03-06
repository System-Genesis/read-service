import mongoose, { Types, Connection } from 'mongoose';
import IGroup from '../group.interface';
import { GroupModel, GroupSchema } from '../group.model';

export default class GroupRepository {
    protected model: mongoose.Model<IGroup>;

    constructor(db: Connection, modelName: string) {
        this.model = db.model(modelName, GroupSchema);
    }

    private static HIDDEN_FIELDS = ' -__v';

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
        findQuery = findQuery.select(GroupRepository.HIDDEN_FIELDS);
        if (!expanded) {
            findQuery = findQuery.select(GroupRepository.DENORMALIZED_FIELDS);
        }
        return findQuery.lean<IGroup[]>({ virtuals: true }).exec();
    }

    findById(groupId: string, excluders, expanded: boolean) {
        if (!mongoose.Types.ObjectId.isValid(groupId)) {
            return null; // TODO: maybe add validation at input?
        }
        let findQuery = this.model.findById({ _id: groupId, ...excluders });
        findQuery = findQuery.select(GroupRepository.HIDDEN_FIELDS);
        if (!expanded) {
            findQuery = findQuery.select(GroupRepository.DENORMALIZED_FIELDS);
        }
        return findQuery.lean<IGroup>({ virtuals: true }).exec();
    }

    findByHierarchy(hierarchyToQuery: string, excluders, expanded: boolean) {
        const hierarchyPathArr = hierarchyToQuery.split('/');
        const groupNameQuery = hierarchyPathArr.pop();
        const hierarchyWithoutGroup = hierarchyPathArr.join('/');
        let findQuery = this.model.findOne({
            hierarchy: hierarchyWithoutGroup,
            name: groupNameQuery,
            ...excluders,
        });
        findQuery = findQuery.select(GroupRepository.HIDDEN_FIELDS);
        if (!expanded) {
            findQuery = findQuery.select(GroupRepository.DENORMALIZED_FIELDS);
        }
        return findQuery.lean<IGroup>({ virtuals: true }).exec();
    }

    findPrefixById(id: string) {
        const findQuery = this.model.aggregate([
            {
                $match: {
                    _id: mongoose.Types.ObjectId(id),
                },
            },
            {
                $graphLookup: {
                    from: 'denormalizedOrganizationGroup',
                    startWith: '$directGroup',
                    connectFromField: 'directGroup',
                    connectToField: '_id',
                    as: 'ancestors',
                    depthField: 'depth',
                },
            },
            {
                $addFields: {
                    ancestors: {
                        $filter: {
                            input: '$ancestors',
                            as: 'item',
                            cond: {
                                $eq: [
                                    {
                                        $type: '$$item.diPrefix',
                                    },
                                    'string',
                                ],
                            },
                        },
                    },
                },
            },
            {
                $unwind: '$ancestors',
            },
            {
                $sort: {
                    'ancestors.depth': 1,
                },
            },
            {
                $group: {
                    _id: '$_id',
                    ancestors: {
                        $push: '$ancestors',
                    },
                },
            },
            {
                $project: {
                    ancestors: {
                        $first: '$ancestors',
                    },
                },
            },
        ]);
        return findQuery.exec();
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
