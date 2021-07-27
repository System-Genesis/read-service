import RoleRepository from './role.repository';
import * as ApiErrors from '../core/ApiErrors';
import DigitalIdentityRepository from '../digitalIdentity/digitalIdentity.repository';

class RoleManager {
    static roleRepository: RoleRepository = new RoleRepository();

    static digitalIdentityRepository: DigitalIdentityRepository = new DigitalIdentityRepository();

    static async findByRoleId(roleId: string) {
        const foundRole = await RoleManager.roleRepository.findByRoleId(roleId);
        if (!foundRole) {
            throw new ApiErrors.NotFoundError();
        }
        return foundRole;
    }

    static async findByDigitalIdentity(uniqueId: string) {
        const foundRole = await RoleManager.roleRepository.findByDigitalIdentity(uniqueId);
        return foundRole;
    }

    static async findByGroup(groupId: string, direct: boolean = true, pageNum: number) {
        let foundRole;
        if (direct) {
            foundRole = await RoleManager.roleRepository.findInGroupId(groupId);
        } else {
            foundRole = await RoleManager.roleRepository.findUnderGroupId(groupId);
        }
        return foundRole;
    }

    // static async findUnderHierarchy(groupId: string, direct: boolean = true, pageNum: number) {
    //     const foundRole = await RoleManager.roleRepository.findByGroupId(groupId);
    //     return foundRole;
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
