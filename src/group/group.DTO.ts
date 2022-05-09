import { IEntity } from '../entity/entity.interface';
import IRole from '../role/role.interface';

export interface GroupDTO {
    // Group as it should be returned to client
    id: string;
    name: string;
    source: string;
    ancestors: string[];
    hierarchy: string;
    akaUnit: string;
    status: string;
    isLeaf: boolean;
    createdAt: Date;
    updatedAt: Date;
    diPrefix: string;
    directEntities: [IEntity];
    directRoles: [IRole];
}
