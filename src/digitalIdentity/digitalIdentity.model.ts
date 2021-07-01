import { model, Schema, Document } from 'mongoose';
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

DISchema.virtual('role', {
    ref: 'role', // The model to use
    localField: 'uniqueId', // Find people where `localField`
    foreignField: 'roleId', // is equal to `foreignField`
    // If `justOne` is true, 'members' will be a single doc as opposed to
    // an array. `justOne` is false by default.
    justOne: true,
    options: { sort: { name: -1 }, limit: 5 }, // Query options, see http://bit.ly/mongoose-query-options
});

const DigitalIdentityModel = model<IDigitalIdentity & Document>('digitalIdentity', DISchema);

export { DigitalIdentityModel, DISchema };
