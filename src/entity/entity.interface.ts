import { model, Schema, Document, Model } from 'mongoose';

interface IEntity extends Document {
    // Entity's Basic information
    id: string;
    displayName: string;
    entityType: string; // enum
    identityCard: string;
    personalNumber: string;
    serviceType: string;
    firstName: string;
    lastName: string;
    akaUnit: string;
    status: string;
    dischargeDate: Date;
    rank: string; // enum
    mail: string;
    job: string;
    phone: string;
    mobilePHone: string;
    address: string;
    clearance: string; // string of number - enum
    sex?: string;
    birthDate?: Date;
}

const entitySchema: Schema = new Schema({
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
});

const EntityModel: Model<IEntity> = model('entity', entitySchema);

export { IEntity, EntityModel };
