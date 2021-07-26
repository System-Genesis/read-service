export default interface IDigitalIdentity {
    // DI's Basic information
    type: string;
    source: string;
    mail: string;
    uniqueId: string;
    entityId: string;
    createdAt: Date;
    updatedAt: Date;
    isRoleAttachable: boolean;
    roleID: string;
}
