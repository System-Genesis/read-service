import { Document, Types } from 'mongoose';
import IRole from '../role/role.interface';

export default interface IDigitalIdentity {
    // DI's Basic information
    type: string;
    source: string;
    mail: string;
    uniqueId: string;
    entityId: Types.ObjectId; // TODO: change to object id -> _id instead of id
    createdAt: Date;
    updatedAt: Date;
    isRoleAttachable: boolean;
    role: IRole;
}
