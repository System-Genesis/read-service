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
<<<<<<< HEAD
    prefix: string;
=======
    diPrefix: string;
>>>>>>> 9d900c4e6274b573f2f7681ef9eccd9c6b35ea35
    directEntities: [IEntity];
    directRoles: [IRole];
}
