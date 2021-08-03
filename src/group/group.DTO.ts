export interface GroupDTO {
    // OG's Basic information
    id: string;
    name: string;
    ancestors: string[];
    hierarchy: string;
    akaUnit: string;
    status: string;
    isLeaf: boolean;
    createdAt: Date;
    updatedAt: Date;
}
