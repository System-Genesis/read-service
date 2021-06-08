/* eslint-disable no-underscore-dangle */

import * as mongoose from 'mongoose';
import { IRead } from '../interfaces/IRead';

export default abstract class BaseRepository<T> implements IRead<T> {
    protected _model: mongoose.Model<T & mongoose.Document>;

    constructor(documentModel: mongoose.Model<T & mongoose.Document>) {
        this._model = documentModel;
    }

    find(query: any): Promise<T[]> {
        return this._model.find(query).exec();
    }

    getAll(): Promise<T[]> {
        return this._model.find({}).exec();
    }

    findOne(id: string): Promise<any> {
        return this._model.findById({ id }).exec();
    }
}
