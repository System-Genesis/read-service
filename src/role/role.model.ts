import { model, Schema, Model, Types } from 'mongoose';
import IRole from './role.interface';
import config from '../config/index';

const RoleSchema: Schema<IRole> = new Schema(
    {
        id: Types.ObjectId,
        roleId: String,
        jobTitle: String,
        digitalIdentityUniqueId: String,
        // TODO: change to string?
        directGroup: Types.ObjectId,
        clearance: String,
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
