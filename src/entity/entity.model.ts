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

EntitySchema.virtual('digitalIdentities', {
    ref: 'digitalIdentity', // The model to use
    localField: 'id', // Find people where `localField`
    foreignField: 'entityId', // is equal to `foreignField`
    // If `justOne` is true, 'members' will be a single doc as opposed to
    // an array. `justOne` is false by default.
    justOne: false,
    options: { sort: { name: -1 }, limit: 5 }, // Query options, see http://bit.ly/mongoose-query-options
});

const EntityModel: Model<IEntity> = model('entity', EntitySchema);

export { EntityModel, EntitySchema };
