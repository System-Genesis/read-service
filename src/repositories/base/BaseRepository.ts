/* eslint-disable no-underscore-dangle */

import * as mongoose from 'mongoose';
import { IRead } from '../interfaces/IRead';

export default abstract class BaseRepository<T> implements IRead<T> {
    protected model: mongoose.Model<T & mongoose.Document>;

    constructor(documentModel: mongoose.Model<T & mongoose.Document>) {
        this.model = documentModel;
    }

    find(query: any): Promise<T[]> {
        return this.model.find(query).exec();
    }

    getAll(): Promise<T[]> {
        return this.model.find({}).exec();
    }
}
