import { Document } from 'mongoose';
import IRole from '../../role/role.interface';

interface IDenormalizedDI extends Document {
    type: string;
    source: string;
    mail: string;
    uniqueId: string;
    entityId: string;
    createdAt: Date;
    updatedAt: Date;
    isRoleAttachable: boolean;
    role: IRole;
}

export default IDenormalizedDI;
