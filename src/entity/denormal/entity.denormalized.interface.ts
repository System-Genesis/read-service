import { Document } from 'mongoose';
import IDenormalizedDI from '../../digitalIdentity/denormal/digitalIdentity.denormalized.interface';

interface IDenormalizedEntity extends Document {
    // Entity's Basic information
    id: string;
    displayName: string;
    hierarchy: string;
    hierarchyIds: string[];
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
    mobilePhone: string;
    address: string;
    clearance: string; // string of number - enum
    sex?: string;
    birthDate?: Date;
    digitalIdentities: [IDenormalizedDI];
}

export default IDenormalizedEntity;
