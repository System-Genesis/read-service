import { model, Schema, Model } from 'mongoose';
import IDenormalizedDI from './digitalIdentity.denormalized.interface';
import { RoleSchema } from '../../role/role.model';
import config from '../../config/index';

const DIDenormalizedSchema: Schema = new Schema(
    {
        type: String,
        source: String,
        mail: String,
        uniqueId: String,
        entityId: String,
        createdAt: Date,
        updatedAt: Date,
        isRoleAttachable: Boolean,
        role: RoleSchema,
    },
    { collection: config.mongo.EntityDenormalizedCollectionName },
);

const DIDenormalizedModel: Model<IDenormalizedDI> = model('digitalIdentityDN', DIDenormalizedSchema);

export { DIDenormalizedModel, DIDenormalizedSchema };
