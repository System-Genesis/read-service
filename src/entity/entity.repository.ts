import BaseRepository from '../repositories/base/BaseRepository';
import IEntity from './entity.interface';
import { EntityModel } from './entity.model';

export default class EntityRepository extends BaseRepository<IEntity> {
    constructor() {
        super(EntityModel);
    }

    findByIdentifier(identifier: string, populated?: boolean): Promise<IEntity | null> {
        const identifierFields = ['personalNumber', 'identityCard', 'userID'];
        const cond = identifierFields.map((key) => {
            return { [key]: { $in: [identifier] } };
        });

        const findQuery = this.model.findOne({ $or: cond });
        let foundRes = findQuery;
        if (populated) {
            foundRes = findQuery
                .populate({
                    path: 'digitalIdentities',
                    populate: {
                        path: 'role',
                    },
                })
                .lean<IEntity | null>();
        }
        return foundRes.exec();
    }

    findById(_id: string, populated?: boolean): Promise<IEntity | null> {
        const findQuery = this.model.findOne({ id: _id });
        let foundRes = findQuery;
        if (populated) {
            foundRes = findQuery
                .populate({
                    path: 'digitalIdentities',
                    populate: {
                        path: 'role',
                    },
                })
                .lean<IEntity | null>();
        }
        return foundRes.exec();
    }

    findByIds(_ids: string[]): Promise<IEntity[]> {
        const findQuery = this.model.find({ id: { $in: _ids } });
        return findQuery.exec();
    }

    findUnderHierarchy(hierarchy: string): Promise<IEntity[]> {
        return this.model.find({ hierarchy }).lean<IEntity[]>().exec();
    }
}
