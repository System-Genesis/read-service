export interface DigitalIdentity {
    // Person's Basic information
    type: string;
    Source: string;
    uniqueId: string; // enum
    domain: string;
    entityId: string;
    createdAt: Date;
    updatedAt: Date;
    canHaveRole: boolean;
}
