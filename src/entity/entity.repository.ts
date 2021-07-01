import BaseRepository from '../repositories/base/BaseRepository';
import IEntity from './entity.interface';
import { EntityModel } from './entity.model';

export default class EntityRepository extends BaseRepository<IEntity> {
    constructor() {
        super(EntityModel);
    }

    getAll(): Promise<IEntity[]> {
        return this.model.find({}).lean<IEntity[]>().exec();
    }

    findByIdentifier(identifier: string, populated?: boolean): Promise<IEntity | null> {
        const byPersonalNumber = this.model.findOne({ personalNumber: identifier });
        const byIdentityCard = this.model.findOne({ identityCard: identifier });
        const byUserId = this.model.findOne({ userID: identifier });
        // TODO choose first found
        const finalRes = byPersonalNumber || byIdentityCard || byUserId;
        if (populated) {
            return finalRes
                .populate({
                    path: 'digitalIdentities',
                    populate: {
                        path: 'role',
                    },
                })
                .lean<IEntity | null>()
                .exec();
        }
        // TODO check why populate not working
        return finalRes.exec();
    }

    findById(_id: string, populated?: boolean): Promise<IEntity | null> {
        const found = this.model.findOne({ id: _id });
        if (populated) {
            return found.populate('digitalIdentities').lean<IEntity | null>().exec();
        }
        return found.lean<IEntity | null>().exec();
    }

    findUnderHierarchy(hierarchy: string): Promise<IEntity[]> {
        return this.model.find({ hierarchy }).lean<IEntity[]>().exec();
    }
}
