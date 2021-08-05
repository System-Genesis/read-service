import * as mongoose from 'mongoose';
import { Types } from 'mongoose';
import IRole from './role.interface';
import { RoleModel } from './role.model';

export default class RoleRepository {
    protected model: mongoose.Model<IRole & mongoose.Document>;

    constructor() {
        this.model = RoleModel;
    }

    static createPagniationQuery = (_id: string) => {
        return {
            _id: { $gt: Types.ObjectId(_id) },
        };
    };

    findByQuery(query: any, excluders) {
        const findQuery = this.model.find({ query, ...excluders });
        return findQuery.lean<IRole[]>().exec();
    }

    findByRoleId(roleId: string, excluders) {
        const findQuery = this.model.findOne({ roleId, ...excluders });
        return findQuery.lean().exec();
    }

    findByDigitalIdentity(uniqueId: string, excluders) {
        const findQuery = this.model.findOne({ digitalIdentityUniqueId: uniqueId, ...excluders });
        return findQuery.lean().exec();
    }

    findInGroupId(groupId: string, excluders) {
        const findQuery = this.model.find({ directGroup: groupId, ...excluders });
        return findQuery.lean().exec();
    }

    findUnderGroupId(groupId: string, excluders) {
        const findQuery = this.model.find({
            hierarchyIds: groupId,
            ...excluders,
        });
        return findQuery.lean().exec();
    }

    findUnderHierarchy(hierarchyToQuery: string, excluders, expanded: boolean, page: number | string, pageSize: number): Promise<IRole[]> {
        let findQuery: mongoose.Query<(IRole & mongoose.Document<any, any>)[], IRole & mongoose.Document<any, any>, {}>;
        if (typeof page === 'number') {
            findQuery = this.model
                .find({ hierarchy: { $regex: `^${hierarchyToQuery}`, $options: 'i' }, ...excluders })
                .skip((page - 1) * pageSize)
                .limit(pageSize);
        } else {
            const pageQuery = RoleRepository.createPagniationQuery(page);
            findQuery = this.model.find({ hierarchy: { $regex: `^${hierarchyToQuery}`, $options: 'i' }, ...excluders, ...pageQuery }).limit(pageSize);
        }

        return findQuery.lean<IRole[]>().exec();
    }
}
