import { model, Schema, Model } from 'mongoose';
import IEntity from './entity.interface';
import config from '../config/index';

const EntitySchema: Schema = new Schema(
    {
        // Entity's Basic information
        id: String,
        displayName: String,
        entityType: String, // enum
        identityCard: String,
        personalNumber: String,
        serviceType: String,
        firstName: String,
        lastName: String,
        akaUnit: String,
        status: String,
        dischargeDate: Date,
        rank: String, // enum
        mail: String,
        job: String,
        phone: String,
        mobilePHone: String,
        address: String,
        clearance: String, // String of number - enum
        sex: String,
        birthDate: Date,
    },
    { collection: config.mongo.EntityCollectionName },
);

const EntityModel: Model<IEntity> = model('entity', entitySchema);

export { EntityModel, EntitySchema };
