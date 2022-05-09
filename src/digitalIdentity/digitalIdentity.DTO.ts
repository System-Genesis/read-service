import { RoleDTO } from '../role/role.DTO';

export default interface DigitalIdentityDTO {
    // DI as it should be returned to client
    type: string;
    source: string;
    mail: string;
    uniqueId: string;
    entityId: string;
    upn: string;
    createdAt: Date;
    updatedAt: Date;
    isRoleAttachable: boolean;
    role: RoleDTO;
}
