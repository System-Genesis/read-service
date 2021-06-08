import BaseRepository from '../repositories/base/BaseRepository';
import { IEntity, EntityModel } from './entity.interface';

export default class EntityRepository extends BaseRepository<IEntity> {
    constructor() {
        super(EntityModel);
    }

    getMembersOfGroups(organizationGroupsIDS: string[]): Promise<IEntity[]> {
        return this.find({ directGroup: { $in: organizationGroupsIDS } });
    }
}
