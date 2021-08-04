import * as mongoose from 'mongoose';
import IDigitalIdentity from './digitalIdentity.interface';
import { DigitalIdentityModel } from './digitalIdentity.model';

export default class DigitalIdentityRepository {
    protected model: mongoose.Model<IDigitalIdentity & mongoose.Document>;

    private static DENORMALIZED_FIELDS = '-role';

    constructor() {
        this.model = DigitalIdentityModel;
    }

    findByQuery(query: any, excluders, expanded?: boolean): Promise<IDigitalIdentity[] | null> {
        let findQuery = this.model.find({ query, ...excluders });
        if (!expanded) {
            findQuery = findQuery.select(DigitalIdentityRepository.DENORMALIZED_FIELDS);
        }
        return findQuery.lean<IDigitalIdentity[]>().exec();
    }

    findByUniqueId(uniqueId: string, excluders, expanded?: boolean): Promise<IDigitalIdentity | null> {
        let findQuery = this.model.findOne({ uniqueId, ...excluders });
        if (!expanded) {
            findQuery = findQuery.select(DigitalIdentityRepository.DENORMALIZED_FIELDS);
        }
        return findQuery.lean<IDigitalIdentity>().exec();
    }

    findByRoleId(roleId: string, excluders, expanded?: boolean): Promise<IDigitalIdentity | null> {
        let findQuery = this.model.findOne({ 'role.roleId': roleId, ...excluders });
        if (!expanded) {
            findQuery = findQuery.select(DigitalIdentityRepository.DENORMALIZED_FIELDS);
        }
        return findQuery.lean<IDigitalIdentity>().exec();
    }
}
