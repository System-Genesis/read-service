import DigitalIdentityDTO from '../digitalIdentity/digitalIdentity.DTO';
import { ProfilePictureData } from './pictures/pictureSchema';

export interface EntityDTO {
    // Entity as it should be returned to client
    id: string;
    displayName: string;
    hierarchy: string;
    directGroup: string;
    entityType: string; // enum
    identityCard: string;
    personalNumber: string;
    goalUserId?: string;
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
    fullClearance: string;
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
    digitalIdentities: DigitalIdentityDTO;
}

// export const EntitySelect = {
//     id: 1,
//     displayName: 1,
//     entityType: 1, // enum
//     identityCard: 1,
//     personalNumber: 1,
//     serviceType: 1,
//     firstName: 1,
//     lastName: 1,
//     akaUnit: 1,
//     status: 1,
//     dischargeDay: 1,
//     rank: 1, // enum
//     mail: 1,
//     job: 1,
//     phone: 1,
//     mobilePhone: 1,
//     address: 1,
//     clearance: 1, // string of number - enum
//     sex: 1,
//     birthDate: 1,
//     pictures: 1,
// };
