import { Schema, Model } from 'mongoose';
import IEntity from './entity.interface';

const mongoose = require('mongoose');

const entitySchema: Schema = new Schema({
    firstName: {
        type: String,
        required: [true, 'You must enter a first name!'],
    },
    lastName: {
        type: String,
    },
});

const EntityModel: Model<IEntity> = mongoose.model('entity', entitySchema);

export default EntityModel;
