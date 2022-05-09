import { Types } from 'mongoose';

export default interface IRole {
    // role as it saved in db
    roleId: string;
    jobTitle: string;
    clearance: string;
    digitalIdentityUniqueId: string;
    directGroup: string;
    hierarchy: string;
    hierarchyIds: string[];
    createdAt: Date;
    updatedAt: Date;
    source: string;
}
