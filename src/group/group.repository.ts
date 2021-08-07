import * as mongoose from 'mongoose';
import { Types } from 'mongoose';
import IGroup from './group.interface';
import { GroupModel } from './group.model';

export default class GroupRepository {
    protected model: mongoose.Model<IGroup & mongoose.Document>;

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

    findByQuery(query: any, excluders, expanded: boolean, page: number | string, pageSize: number): Promise<IGroup[]> {
        let findQuery: mongoose.Query<(IGroup & mongoose.Document<any, any>)[], IGroup & mongoose.Document<any, any>, {}>;

        if (typeof page === 'number') {
            findQuery = this.model
                .find({ $and: [{ ...query }, { ...excluders }] })
                .skip((page - 1) * pageSize)
                .limit(pageSize + 1);
        } else {
            const pageQuery = GroupRepository.createPagniationQuery(page);
            findQuery = this.model.find({ $and: [{ ...query }, { ...excluders }, { ...pageQuery }] }).limit(pageSize + 1);
        }
        if (!expanded) {
            findQuery = findQuery.select(GroupRepository.DENORMALIZED_FIELDS);
        }
        return findQuery.lean<IGroup[]>().exec();
    }

    findById(groupId: string, excluders, expanded: boolean) {
        let findQuery = this.model.findOne({ id: groupId, ...excluders });
        if (!expanded) {
            findQuery = findQuery.select(GroupRepository.DENORMALIZED_FIELDS);
        }
        return findQuery.lean<IGroup>().exec();
    }

    findUnderHierarchy(hierarchyToQuery: string, excluders, expanded: boolean, page: number | string, pageSize: number): Promise<IGroup[]> {
        let findQuery: mongoose.Query<(IGroup & mongoose.Document<any, any>)[], IGroup & mongoose.Document<any, any>, {}>;
        if (typeof page === 'number') {
            findQuery = this.model
                .find({
                    hierarchy: { $regex: `^${hierarchyToQuery}`, $options: 'i' },
                    ...excluders,
                })
                .skip((page - 1) * pageSize)
                .limit(pageSize + 1);
        } else {
            const pageQuery = GroupRepository.createPagniationQuery(page);
            findQuery = this.model
                .find({
                    hierarchy: { $regex: `^${hierarchyToQuery}`, $options: 'i' },
                    ...excluders,
                    ...pageQuery,
                })
                .limit(pageSize + 1);
        }
        if (!expanded) {
            findQuery = findQuery.select(GroupRepository.DENORMALIZED_FIELDS);
        }
        return findQuery.lean<IGroup[]>().exec();
    }
}
