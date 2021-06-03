import { roleDTO } from '../role/roleDTO';

export interface DigitalIdentityDTO {
    // DI's Basic information
    type: string;
    source: string;
    mail: string; // enum
    uniqueId: string;
    entityId: string;
    createdAt: Date;
    updatedAt: Date;
    isRoleAttachable: boolean;
    // when expanded
    role: roleDTO;
}
