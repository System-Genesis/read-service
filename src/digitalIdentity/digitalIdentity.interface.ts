import { Document } from 'mongoose';
import IRole from '../role/role.interface';

export default interface IDigitalIdentity extends Document {
    // DI's Basic information
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
