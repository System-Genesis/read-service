import BaseRepository from '../../repositories/base/BaseRepository';
import IDenormalizedEntity from './entity.denormalized.interface';
import DenormalizedEntityModel from './entity.denormalized.model';

export default class EntityDenormalizedRepository extends BaseRepository<IDenormalizedEntity> {
    static async find() {
        throw new Error('Method not implemented.');
    }

    constructor() {
        super(DenormalizedEntityModel);
    }

    getMembersOfGroups(organizationGroupsIDS: string[]): Promise<IDenormalizedEntity[]> {
        return this.find({ directGroup: { $in: organizationGroupsIDS } });
    }
}
