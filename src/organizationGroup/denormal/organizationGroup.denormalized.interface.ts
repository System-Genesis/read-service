import { Document } from 'mongoose';
import IEntity from '../../entity/entity.interface';
import IRole from '../../role/role.interface';

interface IDenormalizedOG extends Document {
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
    directEntities: [IEntity];
    directRoles: [IRole];
}

export default IDenormalizedOG;
