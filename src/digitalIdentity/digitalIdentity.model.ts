import { model, Schema, Model, Document } from 'mongoose';
import IDigitalIdentity from './digitalIdentity.interface';
import config from '../config/index';

const DISchema: Schema = new Schema(
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
    },
    { collection: config.mongo.DigitalIdentityCollectionName },
);

const DigitalIdentityModel = model<IDigitalIdentity & Document>('digitalIdentity', DISchema);

export { DigitalIdentityModel, DISchema };
