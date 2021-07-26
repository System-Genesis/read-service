import DigitalIdentityRepository from './digitalIdentity.repository';
import RoleRepository from '../role/role.repository';
import * as ApiErrors from '../core/ApiErrors';

class DigitalIdentityManager {
    static digitalIdentityRepository: DigitalIdentityRepository = new DigitalIdentityRepository();

    static roleRepository: RoleRepository = new RoleRepository();

    static async findByRoleId(roleId: string) {
        const foundRole = await DigitalIdentityManager.roleRepository.findByRoleId(roleId);
        if (!foundRole) {
            throw new ApiErrors.NotFoundError();
        }
        const { digitalIdentityUniqueId } = foundRole;
        const foundDI = await DigitalIdentityManager.digitalIdentityRepository.findByUniqueId(digitalIdentityUniqueId);
        if (!foundDI) {
            throw new ApiErrors.NotFoundError();
        }
        return foundDI;
    }

    // static async findByDigitalIdentity(uniqueId: string) {
    //     const foundEntity = await RoleManager.digitalIdentityRepository.findByDigitalIdentity(uniqueId);
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
export default RoleManager;
