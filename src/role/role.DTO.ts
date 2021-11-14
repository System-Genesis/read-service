export interface RoleDTO {
    // role as it should be returned to client
    roleId: string;
    jobTitle: string;
    digitalIdentityUniqueId: string;
    directGroup: string;
    clearance: string;
    hierarchy: string;
    hierarchyIds: string[];
    createdAt: Date;
    updatedAt: Date;
    source: string;
}
