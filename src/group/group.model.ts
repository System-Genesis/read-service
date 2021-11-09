import { model, Schema, Model, Types } from 'mongoose';
import mongooseLeanVirtuals = require('mongoose-lean-virtuals');
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
<<<<<<< HEAD
        prefix: String,
=======
        diPrefix: String,
>>>>>>> 9d900c4e6274b573f2f7681ef9eccd9c6b35ea35
        directEntities: [EntitySchema],
        directRoles: [RoleSchema],
    },
    { collection: config.mongo.GroupCollectionName },
);

GroupSchema.virtual('id').get(function get(this: IGroup) {
    return this._id.toString();
});

GroupSchema.plugin(mongooseLeanVirtuals);

const GroupModel: Model<IGroup> = model('Group', GroupSchema);

export { GroupModel, GroupSchema };
