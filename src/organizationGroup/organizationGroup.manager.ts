import GroupRepository from './organizationGroup.repository';
import * as ApiErrors from '../core/ApiErrors';

class GroupManager {
    static groupRepository: GroupRepository = new GroupRepository();

    static async findById(id: string, expanded: boolean = false) {
        const group = await GroupManager.groupRepository.getAncestorsFromGroup(id);
        if (!group) {
            throw new ApiErrors.NotFoundError();
        }
        return group;
    }

    // static async findByIdentifier(identifier: string, expanded: boolean = false) {
    //     const entities = await EntityManager.entityRepository.findByIdentifier(identifier, expanded);
    //     return entities;
    // }

    // static async findByRole(roleID: string, expanded: boolean = false) {
    //     const foundRole = await EntityManager.roleRepository.getByRoleId(roleID);
    //     if (!foundRole) {
    //         throw new ApiErrors.NotFoundError();
    //     }
    //     const { digitalIndentityUniqueId } = foundRole;
    //     const foundDI = await EntityManager.digitalIdentityRepository.findByUniqueId(digitalIndentityUniqueId);
    //     if (!foundDI) {
    //         throw new ApiErrors.NotFoundError();
    //     }
    //     const { entityId } = foundDI;
    //     EntityManager.entityRepository.findById(entityId, expanded);
    // }

    // static async findByDigitalIdentity(uniqueId: string, expanded: boolean = false) {
    //     const foundDI = await EntityManager.digitalIdentityRepository.findByUniqueId(uniqueId);
    //     if (!foundDI) {
    //         throw new ApiErrors.NotFoundError();
    //     }
    //     const entityID = foundDI.entityId;
    //     const foundEntity = await EntityManager.entityRepository.findById(entityID, expanded);
    //     return foundEntity;
    // }

    // static async findUnderGroup(groupID: string, expanded: boolean = false) {
    //     const foundEntitiesDN = await EntityManager.entityDenormalizedRepository.findUnderGroup(groupID);
    //     const foundEntitiesIds = foundEntitiesDN.map((entityDN) => entityDN.id);
    //     let foundEntities: Promise<IEntity[]> | IDenormalizedEntity[] = foundEntitiesDN;
    //     if (!expanded) {
    //         foundEntities = EntityManager.entityRepository.findByIds(foundEntitiesIds);
    //     }
    //     return foundEntities;
    // }

    // static async findUnderHierarchy(hierarchy: string, expanded: boolean = false) {
    //     const foundEntitiesDN = await EntityManager.entityDenormalizedRepository.findUnderHierarchy(hierarchy);
    //     const foundEntitiesIds = foundEntitiesDN.map((entityDN) => entityDN.id);
    //     let foundEntities: Promise<IEntity[]> | IDenormalizedEntity[] = foundEntitiesDN;
    //     if (!expanded) {
    //         foundEntities = EntityManager.entityRepository.findByIds(foundEntitiesIds);
    //     }
    //     return foundEntities;
    // }
}
export default GroupManager;
