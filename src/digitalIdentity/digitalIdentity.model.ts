import { model, Schema, Document } from 'mongoose';
import IDigitalIdentity from './digitalIdentity.interface';
import { RoleSchema } from '../role/role.model';
import config from '../config/index';

const DigitalIdentitySchema: Schema = new Schema(
    {
        roleId: String,
        jobTitle: String,
        digitalIndentityUniqueId: String,
        directGroup: String,
        hierarchy: String,
        hierarchyIds: [String],
        createdAt: Date,
        updatedAt: Date,
        source: String,
        role: RoleSchema,
    },
    { collection: config.mongo.DigitalIdentityCollectionName },
);

const DigitalIdentityModel = model<IDigitalIdentity & Document>('digitalIdentity', DigitalIdentitySchema);

export { DigitalIdentityModel, DigitalIdentitySchema };
