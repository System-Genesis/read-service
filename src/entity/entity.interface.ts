import { Schema } from 'mongoose';
import IDigitalIdentity from '../digitalIdentity/digitalIdentity.interface';
import { ProfilePictureData, pictures } from './pictures/pictureSchema';

interface IEntity {
    // Entity's saved in denormalized db
    _id: Schema.Types.ObjectId;
    id: string;
    displayName: string;
    hierarchy: string;
    hierarchyIds: string[];
    directGroup: string;
    entityType: string; // enum
    identityCard: string;
    personalNumber: string;
    goalUserId?: string;
    employeeNumber: string;
    employeeId: string;
    organization: string;
    serviceType: string;
    firstName: string;
    lastName: string;
    fullName: string;
    akaUnit: string;
    dischargeDay: Date;
    rank: string; // enum
    mail: string;
    jobTitle: string;
    phone: string[];
    mobilePhone: string[];
    address: string;
    clearance: string; // string of number - enum
    sex?: string;
    birthDate?: Date;
    createdAt?: Date;
    updatedAt?: Date;
    pictures?: {
        profile?: {
            url: string;
            meta: ProfilePictureData;
        };
    };
    digitalIdentities: [IDigitalIdentity];
}

export { IEntity, ProfilePictureData, pictures };
