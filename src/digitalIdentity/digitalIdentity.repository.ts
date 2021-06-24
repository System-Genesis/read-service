import BaseRepository from '../repositories/base/BaseRepository';
import IDigitalIdentity from './digitalIdentity.interface';
import { DigitalIdentityModel } from './digitalIdentity.model';

export default class DigitalIdentityRepository extends BaseRepository<IDigitalIdentity> {
    constructor() {
        super(DigitalIdentityModel);
    }

    findByUniqueId(uniqueId: string): Promise<IDigitalIdentity | null> {
        const foundByUniqueId = this.model.findOne({ uniqueId }).exec();
        return foundByUniqueId;
    }
}
