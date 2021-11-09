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
<<<<<<< HEAD
    prefix: string;
=======
    diPrefix: string;
>>>>>>> 9d900c4e6274b573f2f7681ef9eccd9c6b35ea35
    directEntities: [IEntity];
    directRoles: [IRole];
}

export default IGroup;
