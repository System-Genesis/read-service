export default interface IRole {
    // Role's Basic information
    roleId: string;
    jobTitle: string;
    digitalIdentityUniqueId: string;
    directGroup: string;
    hierarchy: string;
    hierarchyIds: string[];
    createdAt: Date;
    updatedAt: Date;
    source: string;
}
