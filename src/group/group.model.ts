import { model, Schema, Model, Types } from 'mongoose';
import IGroup from './group.interface';
import config from '../config/index';
import { EntitySchema } from '../entity/entity.model';
import { RoleSchema } from '../role/role.model';

const GroupSchema: Schema = new Schema(
    {
        name: String,
        source: String,
        directGroup: Types.ObjectId, // TODO: change to Schema.Types.ObjectId
        ancestors: [Types.ObjectId],
        hierarchy: String,
        status: String,
        isLeaf: Boolean,
        createdAt: Date,
        updatedAt: Date,
        directEntities: [EntitySchema],
        directRoles: [RoleSchema],
    },
    { collection: config.mongo.GroupCollectionName },
);

const GroupModel: Model<IGroup> = model('Group', GroupSchema);

export { GroupModel, GroupSchema };
