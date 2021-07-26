import RoleRepository from './role.repository';
import * as ApiErrors from '../core/ApiErrors';
import DigitalIdentityRepository from '../digitalIdentity/digitalIdentity.repository';

class RoleManager {
    static roleRepository: RoleRepository = new RoleRepository();

    static digitalIdentityRepository: DigitalIdentityRepository = new DigitalIdentityRepository();

    static async findByRoleId(roleId: string) {
        const role = await RoleManager.roleRepository.findByRoleId(roleId);
        if (!role) {
            throw new ApiErrors.NotFoundError();
        }
        return role;
    }

    static async findByDigitalIdentity(uniqueId: string) {
        const foundEntity = await RoleManager.roleRepository.findByDigitalIdentity(uniqueId);
        return foundEntity;
    }

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
export default RoleManager;
