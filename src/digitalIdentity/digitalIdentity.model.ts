import { model, Schema, Document, Types } from 'mongoose';
import IDigitalIdentity from './digitalIdentity.interface';
import { RoleSchema } from '../role/role.model';
import config from '../config/index';

const DigitalIdentitySchema: Schema = new Schema(
    {
        entityId: String, // TODO: change to Schema.Types.ObjectId -> _id instead of id
        jobTitle: String,
        uniqueId: String,
        directGroup: String,
        createdAt: Date,
        updatedAt: Date,
        source: String,
        isRoleAttachable: Boolean,
        role: RoleSchema,
    },
    { collection: config.mongo.DigitalIdentityCollectionName },
);

const DigitalIdentityModel = model<IDigitalIdentity>('digitalIdentity', DigitalIdentitySchema);

export { DigitalIdentityModel, DigitalIdentitySchema };
