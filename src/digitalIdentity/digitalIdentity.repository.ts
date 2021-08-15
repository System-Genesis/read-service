import * as mongoose from 'mongoose';
import { Types } from 'mongoose';
import IDigitalIdentity from './digitalIdentity.interface';
import { DigitalIdentityModel } from './digitalIdentity.model';

export default class DigitalIdentityRepository {
    protected model: mongoose.Model<IDigitalIdentity>;

    private static DENORMALIZED_FIELDS = '-role';

    constructor() {
        this.model = DigitalIdentityModel;
    }

    static createPagniationQuery = (_id: string) => {
        return {
            _id: { $gt: Types.ObjectId(_id) },
        };
    };

    findByQuery(query: any, excluders, expanded: boolean, page: number, pageSize: number): Promise<IDigitalIdentity[]> {
        let findQuery = this.model
            .find({ $and: [{ ...query }, { ...excluders }] })
            .skip((page - 1) * pageSize)
            .limit(pageSize + 1);

        if (!expanded) {
            findQuery = findQuery.select(DigitalIdentityRepository.DENORMALIZED_FIELDS);
        }
        return findQuery.lean<IDigitalIdentity[]>().exec();
    }

    findByUniqueId(uniqueId: string, excluders, expanded: boolean): Promise<IDigitalIdentity | null> {
        let findQuery = this.model.findOne({ uniqueId, ...excluders });
        if (!expanded) {
            findQuery = findQuery.select(DigitalIdentityRepository.DENORMALIZED_FIELDS);
        }
        return findQuery.lean<IDigitalIdentity>().exec();
    }

    findByRoleId(roleId: string, excluders, expanded: boolean): Promise<IDigitalIdentity | null> {
        let findQuery = this.model.findOne({ 'role.roleId': roleId, ...excluders });
        if (!expanded) {
            findQuery = findQuery.select(DigitalIdentityRepository.DENORMALIZED_FIELDS);
        }
        return findQuery.lean<IDigitalIdentity>().exec();
    }
}
