import * as mongoose from 'mongoose';
import IDigitalIdentity from './digitalIdentity.interface';
import { DigitalIdentityModel } from './digitalIdentity.model';

export default class DigitalIdentityRepository {
    protected model: mongoose.Model<IDigitalIdentity & mongoose.Document>;

    constructor() {
        this.model = DigitalIdentityModel;
    }

    findByUniqueId(uniqueId_: string): Promise<IDigitalIdentity | null> {
        const foundByUniqueId = this.model.findOne({ uniqueId: uniqueId_ }).lean().exec();
        return foundByUniqueId;
    }
}
