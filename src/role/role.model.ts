import { model, Schema, Model, Document } from 'mongoose';
import IRole from './role.interface';
import config from '../config/index';

const RoleSchema: Schema = new Schema(
    {
        roleId: String,
        jobTitle: String,
        digitalIdentityUniqueId: String,
        directGroup: String,
        hierarchy: String,
        hierarchyIds: [String],
        createdAt: Date,
        updatedAt: Date,
        source: String,
    },
    { collection: config.mongo.RoleCollectionName },
);

const RoleModel: Model<IRole> = model('role', RoleSchema);

export { RoleModel, RoleSchema };
