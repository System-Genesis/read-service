import { Document } from 'mongoose';
import { IEntity } from '../entity/entity.interface';
import IRole from '../role/role.interface';

interface IGroup {
    // OG's Basic information
    _id: string;
    name: string;
    source: string;
    directGroup: string; // TODO: change to Types.object id d
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

export default IGroup;
