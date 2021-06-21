import { model, Schema, Model } from 'mongoose';
import IDenormalizedDI from './organizationGroup.denormalized.interface';
import { RoleSchema } from '../../role/role.model';
import config from '../../config/index';

const OGDenormalizedSchema: Schema = new Schema(
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

const OGDenormalizedModel: Model<IDenormalizedDI> = model('organizationGroupDN', OGDenormalizedSchema);

export { OGDenormalizedModel, OGDenormalizedSchema };
