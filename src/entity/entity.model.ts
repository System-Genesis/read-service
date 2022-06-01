import { model, Schema, Model } from 'mongoose';
import mongooseLeanVirtuals = require('mongoose-lean-virtuals');
import { IEntity } from './entity.interface';
import { DigitalIdentitySchema } from '../digitalIdentity/digitalIdentity.model';
import config from '../config/index';

const EntitySchema: Schema<IEntity> = new Schema(
    {
        // Entity's Basic information
        displayName: String,
        entityType: String, // enum
        identityCard: String,
        personalNumber: String,
        goalUserId: String,
        employeeNumber: String,
        employeeId: String,
        organization: String,
        serviceType: String,
        firstName: String,
        lastName: String,
        akaUnit: String,
        dischargeDay: Date,
        rank: String, // enum
        mail: String,
        job: String,
        phone: [String],
        mobilePhone: [String],
        address: String,
        clearance: String, // String of number - enum
        fullClearance: String,
        sex: String,
        birthDate: Date,
        createdAt: Date,
        updatedAt: Date,
        directGroup: String,
        hierarchy: String,
        hierarchyIds: [String],
        picture: {
            profile: {
                url: String,
                meta: {
                    path: String,
                    format: String,
                    takenAt: Date,
                    updatedAt: Date,
                },
            },
        },
        digitalIdentities: [DigitalIdentitySchema],
    },
    { collection: config.mongo.EntityCollectionName, id: true },
);

EntitySchema.virtual('id').get(function get(this: IEntity) {
    return this._id.toString();
});

EntitySchema.plugin(mongooseLeanVirtuals);
// EntitySchema.set('toObject', { getters: true });

const EntityModel: Model<IEntity> = model('entity', EntitySchema);

export { EntityModel, EntitySchema };
