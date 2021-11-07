import { model, Schema, Model, Types } from 'mongoose';
import IRole from './role.interface';
import config from '../config/index';

const RoleSchema: Schema = new Schema(
    {
        roleId: String,
        jobTitle: String,
        digitalIdentityUniqueId: String,
        directGroup: Types.ObjectId,
        clearance: String,
        hierarchy: String,
        hierarchyIds: [Types.ObjectId],
        createdAt: Date,
        updatedAt: Date,
        source: String,
    },
    { collection: config.mongo.RoleCollectionName },
);

const RoleModel: Model<IRole> = model('role', RoleSchema);

export { RoleModel, RoleSchema };
