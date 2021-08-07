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

    findByQuery(query: any, excluders, page: number | string, pageSize: number): Promise<IRole[]> {
        let findQuery: mongoose.Query<(IRole & mongoose.Document<any, any>)[], IRole & mongoose.Document<any, any>, {}>;

        if (typeof page === 'number') {
            findQuery = this.model
                .find({
                    ...query,
                    ...excluders,
                })
                .skip((page - 1) * pageSize)
                .limit(pageSize + 1);
        } else {
            // TODO: chain find
            const pageQuery = RoleRepository.createPagniationQuery(page);
            findQuery = this.model
                .find({
                    ...query,
                    ...excluders,
                    ...pageQuery,
                })
                .limit(pageSize + 1);
        }
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

    findInGroupId(groupId: string, excluders, page: number | string, pageSize: number): Promise<IRole[]> {
        let findQuery: mongoose.Query<(IRole & mongoose.Document<any, any>)[], IRole & mongoose.Document<any, any>, {}>;
        if (typeof page === 'number') {
            findQuery = this.model
                .find({ directGroup: groupId, ...excluders })
                .skip((page - 1) * pageSize)
                .limit(pageSize + 1);
        } else {
            const pageQuery = RoleRepository.createPagniationQuery(page);
            findQuery = this.model.find({ directGroup: groupId, ...excluders, ...pageQuery }).limit(pageSize + 1);
        }
        return findQuery.lean<IRole[]>().exec();
    }

    findUnderGroupId(groupId: string, excluders, page: number | string, pageSize: number): Promise<IRole[]> {
        let findQuery: mongoose.Query<(IRole & mongoose.Document<any, any>)[], IRole & mongoose.Document<any, any>, {}>;
        if (typeof page === 'number') {
            findQuery = this.model
                .find({
                    hierarchyIds: groupId,
                    ...excluders,
                })
                .skip((page - 1) * pageSize)
                .limit(pageSize + 1);
        } else {
            const pageQuery = RoleRepository.createPagniationQuery(page);

            findQuery = this.model
                .find({
                    hierarchyIds: groupId,
                    ...excluders,
                    ...pageQuery,
                })
                .limit(pageSize + 1);
        }
        return findQuery.lean<IRole[]>().exec();
    }

    findUnderHierarchy(hierarchyToQuery: string, excluders, page: number | string, pageSize: number): Promise<IRole[]> {
        let findQuery: mongoose.Query<(IRole & mongoose.Document<any, any>)[], IRole & mongoose.Document<any, any>, {}>;
        if (typeof page === 'number') {
            findQuery = this.model
                .find({ hierarchy: { $regex: `^${hierarchyToQuery}`, $options: 'i' }, ...excluders })
                .skip((page - 1) * pageSize)
                .limit(pageSize + 1);
        } else {
            const pageQuery = RoleRepository.createPagniationQuery(page);
            findQuery = this.model
                .find({ hierarchy: { $regex: `^${hierarchyToQuery}`, $options: 'i' }, ...excluders, ...pageQuery })
                .limit(pageSize + 1);
        }

        return findQuery.lean<IRole[]>().exec();
    }
}
