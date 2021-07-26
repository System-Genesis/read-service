import * as mongoose from 'mongoose';
import IEntity from './entity.interface';
import { EntityModel } from './entity.model';

export default class EntityRepository {
    protected model: mongoose.Model<IEntity & mongoose.Document>;

    constructor() {
        this.model = EntityModel;
    }

    find(queries: any, pageNumber: number, limit: number): Promise<IEntity[]> {
        return this.model.find(queries, { skip: 10, limit: 5 }).lean<IEntity[]>().exec();
    }

    findOne(cond?: any, populateOptions?: string | Object, select?: string): Promise<IEntity> {
        let findQuery = this.model.findOne(cond);
        if (populateOptions) {
            findQuery = findQuery.populate(populateOptions);
        }
        if (select) {
            findQuery = findQuery.select(select);
        }
        return findQuery.lean<IEntity>().exec();
    }

    // findOr(keys: string[], values: string[], populate?: boolean) {
    //     const cond = keys.map((key) => {
    //         return { [key]: { $in: values } };
    //     });

    //     return this.find({ $or: cond });
    // }

    findByIdentifier(identifier: string, excluders, populated?: boolean): Promise<IEntity | null> {
        const identifierFields = ['personalNumber', 'identityCard', 'userID'];
        const cond = identifierFields.map((key) => {
            return { [key]: { $in: [identifier] } };
        });

        const findQuery = this.model.findOne({ $or: cond, ...excluders });
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

    findById(_id: string, excluders, populated?: boolean) {
        const findQuery = this.model.findOne({ id: _id, ...excluders });
        let foundRes = findQuery;
        if (populated) {
            foundRes = findQuery.populate({
                path: 'digitalIdentities',
                populate: {
                    path: 'role',
                },
            });
        }
        return foundRes.lean().exec();
    }

    findByIds(_ids: string[]): Promise<IEntity[]> {
        const findQuery = this.model.find({ id: { $in: _ids } });
        return findQuery.lean<IEntity[]>().exec();
    }

    findUnderHierarchy(hierarchy: string): Promise<IEntity[]> {
        return this.model.find({ hierarchy }).lean<IEntity[]>().exec();
    }
}
