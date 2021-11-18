import * as mongoose from 'mongoose';
import { Types } from 'mongoose';
import IRole from './role.interface';
import { RoleModel } from './role.model';

export default class RoleRepository {
    protected model: mongoose.Model<IRole>;

    constructor() {
        this.model = RoleModel;
    }

    private static HIDDEN_FIELDS = ' -__v -_id -id';

    static createPagniationQuery = (_id: string) => {
        return {
            _id: { $gt: Types.ObjectId(_id) },
        };
    };

    findByQuery(query: any, excluders, page: number, pageSize: number): Promise<IRole[]> {
        let findQuery = this.model
            .find({
                ...query,
                ...excluders,
            })
            .skip((page - 1) * pageSize)
            .limit(pageSize + 1);

        // TODO: chain find
        findQuery = findQuery.select(RoleRepository.HIDDEN_FIELDS);
        return findQuery.lean<IRole[]>().exec();
    }

    findByRoleId(roleId: string, excluders): Promise<IRole> {
        let findQuery = this.model.findOne({ roleId: { $regex: `^${roleId}$`, $options: 'i' }, ...excluders });
        findQuery = findQuery.select(RoleRepository.HIDDEN_FIELDS);
        return findQuery.lean<IRole>().exec();
    }

    findByDigitalIdentity(uniqueId: string, excluders): Promise<IRole> {
        let findQuery = this.model.findOne({ digitalIdentityUniqueId: { $regex: `^${uniqueId}$`, $options: 'i' }, ...excluders });
        findQuery = findQuery.select(RoleRepository.HIDDEN_FIELDS);
        return findQuery.lean<IRole>().exec();
    }

    findInGroupId(groupId: string, excluders, page: number, pageSize: number): Promise<IRole[]> {
        let findQuery = this.model
            .find({ directGroup: groupId, ...excluders })
            .skip((page - 1) * pageSize)
            .limit(pageSize + 1);
        findQuery = findQuery.select(RoleRepository.HIDDEN_FIELDS);
        return findQuery.lean<IRole[]>().exec();
    }

    findUnderGroupId(groupId: string, excluders, page: number, pageSize: number): Promise<IRole[]> {
        let findQuery = this.model
            .find({
                hierarchyIds: groupId,
                ...excluders,
            })
            .skip((page - 1) * pageSize)
            .limit(pageSize + 1);
        findQuery = findQuery.select(RoleRepository.HIDDEN_FIELDS);
        return findQuery.lean<IRole[]>().exec();
    }

    findUnderHierarchy(hierarchyToQuery: string, excluders, page: number, pageSize: number): Promise<IRole[]> {
        let findQuery = this.model
            .find({ hierarchy: { $regex: `^${hierarchyToQuery}`, $options: 'i' }, ...excluders })
            .skip((page - 1) * pageSize)
            .limit(pageSize + 1);
        findQuery = findQuery.select(RoleRepository.HIDDEN_FIELDS);
        return findQuery.lean<IRole[]>().exec();
    }

    findByHierarchy(hierarchyToQuery: string, excluders, page: number, pageSize: number): Promise<IRole[]> {
        let findQuery = this.model
            .find({ hierarchy: hierarchyToQuery, ...excluders })
            .skip((page - 1) * pageSize)
            .limit(pageSize + 1);
        findQuery = findQuery.select(RoleRepository.HIDDEN_FIELDS);
        return findQuery.lean<IRole[]>().exec();
    }
}
