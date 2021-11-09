import { Schema } from 'mongoose';
import { IEntity } from '../entity/entity.interface';
import IRole from '../role/role.interface';

interface IGroup {
    // Group as it save in the db
    _id: Schema.Types.ObjectId;
    id: string;
    name: string;
    source: string;
    directGroup: string;
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

export default IGroup;
