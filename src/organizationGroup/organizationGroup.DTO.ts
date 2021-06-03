export interface DigitalIdentityDTO {
    // OG's Basic information
    id: string;
    name: string;
    ancestors: string[]; // enum
    hierarchy: string;
    status: string;
    isLeaf: boolean;
    createdAt: Date;
    updatedAt: Date;
    directEntities: string[];
}
