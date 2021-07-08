/* eslint-disable no-underscore-dangle */

import * as mongoose from 'mongoose';
import { IRead } from '../interfaces/IRead';

export default abstract class BaseRepository<T> implements IRead<T> {
    protected model: mongoose.Model<T & mongoose.Document>;

    constructor(documentModel: mongoose.Model<T & mongoose.Document>) {
        this.model = documentModel;
    }

    getAll(): Promise<T[]> {
        return this.model.find().exec();
    }

    find(queries: any): Promise<T[]> {
        return this.model.find(queries).exec();
    }

    findOne(cond?: any, populateOptions?: string | Object, select?: string): Promise<T> {
        let findQuery = this.model.findOne(cond);
        if (populateOptions) {
            findQuery = findQuery.populate(populateOptions);
        }
        if (select) {
            findQuery = findQuery.select(select);
        }
        return findQuery.lean<T>().exec();
    }

    findOr(keys: string[], values: string[], populate?: boolean) {
        const cond = keys.map((key) => {
            return { [key]: { $in: values } };
        });

        return this.find({ $or: cond });
    }
}
