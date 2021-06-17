import BaseRepository from '../repositories/base/BaseRepository';
import IEntity from './entity.interface';
import EntityModel from './entity.model';

export default class EntityRepository extends BaseRepository<IEntity> {
    constructor() {
        super(EntityModel);
    }

    getById(id: string): Promise<IEntity[]> {
        return this.model.find({ _id: id }).exec();
    }

    getByIdentifier(identifier: string): Promise<IEntity[]> {
        const byPersonalNumber = this.model.find({ personalNumber: identifier }).exec();
        const byIdentityCard = this.model.find({ identityCard: identifier }).exec();
        const byUserId = this.model.find({ userID: identifier }).exec();
        return byPersonalNumber || byIdentityCard || byUserId;
    }

    getMembersOfGroups(organizationGroupsIDS: string[]): Promise<IEntity[]> {
        return this.find({ directGroup: { $in: organizationGroupsIDS } });
    }
}
