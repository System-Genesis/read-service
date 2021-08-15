import { model, Schema, Model, Document } from 'mongoose';
import IGroup from './group.interface';
import config from '../config/index';
import { EntitySchema } from '../entity/entity.model';
import { RoleSchema } from '../role/role.model';

const GroupSchema: Schema = new Schema(
    {
        id: String,
        name: String,
        source: String,
        directGroup: String, // TODO: change to Schema.Types.ObjectId
        ancestors: [String],
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
