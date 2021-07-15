export interface EntityDTO {
    // Person's Basic information
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
    phone: string[];
    mobilePhone: string[];
    address: string;
    clearance: string; // string of number - enum
    sex?: string;
    birthDate?: Date;
    pictures: {
        profile: {
            url: string;
        };
    };
}

export const EntitySelect = {
    // Person's Basic information
    id: 1,
    displayName: 1,
    entityType: 1, // enum
    identityCard: 1,
    personalNumber: 1,
    serviceType: 1,
    firstName: 1,
    lastName: 1,
    akaUnit: 1,
    status: 1,
    dischargeDate: 1,
    rank: 1, // enum
    mail: 1,
    job: 1,
    phone: 1,
    mobilePhone: 1,
    address: 1,
    clearance: 1, // string of number - enum
    sex: 1,
    birthDate: 1,
    pictures: 1,
};
