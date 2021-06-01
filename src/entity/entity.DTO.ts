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
    phone: string;
    mobilePHone: string;
    address: string;
    clearance: string; // string of number - enum
    sex?: string;
    birthDate?: Date;
}
