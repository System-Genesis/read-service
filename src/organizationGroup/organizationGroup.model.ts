import { model, Schema, Model, Document } from 'mongoose';
import { IGroup } from './organizationGroup.interface';
import config from '../config/index';

const GroupSchema: Schema = new Schema(
    {
        roleId: String,
        jobTitle: String,
        digitalIndentityUniqueId: String,
        directGroup: String,
        createdAt: Date,
        updatedAt: Date,
        source: String,
    },
    { collection: config.mongo.OrganzationGroupsCollectionName },
);

const GroupModel: Model<IGroup & Document> = model('Group', GroupSchema);

export { GroupModel, GroupSchema };
