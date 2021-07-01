import BaseRepository from '../repositories/base/BaseRepository';
import IDigitalIdentity from './digitalIdentity.interface';
import { DigitalIdentityModel } from './digitalIdentity.model';

export default class DigitalIdentityRepository extends BaseRepository<IDigitalIdentity> {
    constructor() {
        super(DigitalIdentityModel);
    }

    findByUniqueId(uniqueId_: string): Promise<IDigitalIdentity | null> {
        const foundByUniqueId = this.model.findOne({ uniqueId: uniqueId_ }).lean().exec();
        return foundByUniqueId;
    }
}
