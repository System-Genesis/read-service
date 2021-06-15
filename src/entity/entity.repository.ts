import BaseRepository from '../repositories/base/BaseRepository';
import IEntity from './entity.interface';
import EntityModel from './entity.model';

export default class EntityRepository extends BaseRepository<IEntity> {
    static async find() {
        throw new Error('Method not implemented.');
    }

    constructor() {
        super(EntityModel);
    }

    getMembersOfGroups(organizationGroupsIDS: string[]): Promise<IEntity[]> {
        return this.find({ directGroup: { $in: organizationGroupsIDS } });
    }
}
