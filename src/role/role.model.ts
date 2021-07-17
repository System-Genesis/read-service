import { model, Schema, Model, Document } from 'mongoose';
import IRole from './role.interface';
import config from '../config/index';

const RoleSchema: Schema = new Schema(
    {
        roleId: String,
        jobTitle: String,
        digitalIndentityUniqueId: String,
        directGroup: String,
        createdAt: Date,
        updatedAt: Date,
        source: String,
    },
    { collection: config.mongo.RoleCollectionName },
);

const RoleModel: Model<IRole & Document> = model('role', RoleSchema);

export { RoleModel, RoleSchema };
