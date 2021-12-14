import { model, Schema, Types } from 'mongoose';
import IDigitalIdentity from './digitalIdentity.interface';
import { RoleSchema } from '../role/role.model';
import config from '../config/index';

const DigitalIdentitySchema: Schema = new Schema(
    {
        id: Types.ObjectId,
        entityId: Types.ObjectId,
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
