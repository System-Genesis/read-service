import IRole from '../role/role.interface';

export default interface IDigitalIdentity {
    // DI as it saved in the db
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
