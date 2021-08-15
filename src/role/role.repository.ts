import * as mongoose from 'mongoose';
import { Types } from 'mongoose';
import IRole from './role.interface';
import { RoleModel } from './role.model';

export default class RoleRepository {
    protected model: mongoose.Model<IRole>;

    constructor() {
        this.model = RoleModel;
    }

    static createPagniationQuery = (_id: string) => {
        return {
            _id: { $gt: Types.ObjectId(_id) },
        };
    };

    findByQuery(query: any, excluders, page: number, pageSize: number): Promise<IRole[]> {
        const findQuery = this.model
            .find({
                ...query,
                ...excluders,
            })
            .skip((page - 1) * pageSize)
            .limit(pageSize + 1);

        // TODO: chain find

        return findQuery.lean<IRole[]>().exec();
    }

    findByRoleId(roleId: string, excluders): Promise<IRole> {
        const findQuery = this.model.findOne({ roleId, ...excluders });
        return findQuery.lean<IRole>().exec();
    }

    findByDigitalIdentity(uniqueId: string, excluders): Promise<IRole> {
        const findQuery = this.model.findOne({ digitalIdentityUniqueId: uniqueId, ...excluders });
        return findQuery.lean<IRole>().exec();
    }

    findInGroupId(groupId: string, excluders, page: number, pageSize: number): Promise<IRole[]> {
        const findQuery = this.model
            .find({ directGroup: groupId, ...excluders })
            .skip((page - 1) * pageSize)
            .limit(pageSize + 1);

        return findQuery.lean<IRole[]>().exec();
    }

    findUnderGroupId(groupId: string, excluders, page: number, pageSize: number): Promise<IRole[]> {
        const findQuery = this.model
            .find({
                hierarchyIds: groupId,
                ...excluders,
            })
            .skip((page - 1) * pageSize)
            .limit(pageSize + 1);

        return findQuery.lean<IRole[]>().exec();
    }

    findUnderHierarchy(hierarchyToQuery: string, excluders, page: number, pageSize: number): Promise<IRole[]> {
        const findQuery = this.model
            .find({ hierarchy: { $regex: `^${hierarchyToQuery}`, $options: 'i' }, ...excluders })
            .skip((page - 1) * pageSize)
            .limit(pageSize + 1);

        return findQuery.lean<IRole[]>().exec();
    }
}
