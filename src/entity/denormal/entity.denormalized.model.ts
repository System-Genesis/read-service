import { PaginateModel, model, Schema, Model, Document } from 'mongoose';
import * as mongoosePaginate from 'mongoose-paginate';
import IDenormalizedEntity from './entity.denormalized.interface';
import { DIDenormalizedSchema } from '../../digitalIdentity/denormal/digitalIdentity.denormalized.model';
import config from '../../config/index';

const entityDenormalizedSchema: Schema = new Schema(
    {
        // Entity's Basic information
        id: String,
        displayName: String,
        entityType: String, // enum
        identityCard: String,
        personalNumber: String,
        serviceType: String,
        firstName: String,
        lastName: String,
        akaUnit: String,
        status: String,
        dischargeDate: Date,
        rank: String, // enum
        mail: String,
        job: String,
        phone: String,
        mobilePHone: String,
        address: String,
        clearance: String, // String of number - enum
        sex: String,
        birthDate: Date,
        digitalIdentities: [DIDenormalizedSchema],
    },
    { collection: config.mongo.EntityDenormalizedCollectionName },
);

entityDenormalizedSchema.plugin(mongoosePaginate);

const EntityDenormalizedModel = model<IDenormalizedEntity>('entity_dn', entityDenormalizedSchema);
export default EntityDenormalizedModel;
// export default model<IDenormalizedEntity, PaginateModel<IDenormalizedEntity>>('entity_dn', entityDenormalizedSchema);
