import BaseRepository from '../../repositories/base/BaseRepository';
import IDenormalizedDI from './digitalIdentity.denormalized.interface';
import { DenormalizedDIModel } from './digitalIdentity.denormalized.model';

export default class EntityDenormalizedRepository extends BaseRepository<IDenormalizedDI> {
    constructor() {
        super(DenormalizedDIModel);
    }

    getById(id: string): Promise<IDenormalizedDI[]> {
        return this.model.find({ _id: id }).exec();
    }
}
