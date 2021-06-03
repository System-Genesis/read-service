export interface roleDTO {
    // Role's Basic information
    roleId: string;
    jobTitle: string;
    digitalIndentityUniqueId: string;
    directGroup: string;
    hierarchy: string;
    hierarchyIds: string[];
    createdAt: Date;
    updatedAt: Date;
    source: string;
}
