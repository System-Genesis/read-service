import { model, Schema, Model, Document } from 'mongoose';
import { IGroup } from './organizationGroup.interface';
import config from '../config/index';

const GroupSchema: Schema = new Schema(
    {
        id: String,
        name: String,
        source: String,
        ancestors: [String],
        hierarchy: String,
        status: String,
        isLeaf: Boolean,
        createdAt: Date,
        updatedAt: Date,
    },
    { collection: config.mongo.OrganzationGroupsCollectionName },
);

const GroupModel: Model<IGroup & Document> = model('Group', GroupSchema);

export { GroupModel, GroupSchema };
