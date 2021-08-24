import IRole from '../role/role.interface';

export default interface IDigitalIdentity {
    // DI as it should be returned to client
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
