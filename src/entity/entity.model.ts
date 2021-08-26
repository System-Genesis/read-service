import { model, Schema, Model } from 'mongoose';
import { IEntity } from './entity.interface';
import { DigitalIdentitySchema } from '../digitalIdentity/digitalIdentity.model';
import config from '../config/index';

const EntitySchema: Schema = new Schema(
    {
        // Entity's Basic information
        displayName: String,
        entityType: String, // enum
        identityCard: String,
        personalNumber: String,
        goalUserId: String,
        serviceType: String,
        firstName: String,
        lastName: String,
        akaUnit: String,
        status: String,
        dischargeDate: Date,
        rank: String, // enum
        mail: String,
        job: String,
        phone: [String],
        mobilePhone: [String],
        address: String,
        clearance: String, // String of number - enum
        sex: String,
        birthDate: Date,
        createdAt: Date,
        updatedAt: Date,
        directGroup: String,
        hierarchy: String,
        hierarchyIds: [String],
        digitalIdentities: [DigitalIdentitySchema],
    },
    { collection: config.mongo.EntityDenormalizedCollectionName },
);

const EntityModel: Model<IEntity> = model('entity', EntitySchema);

export { EntityModel, EntitySchema };
