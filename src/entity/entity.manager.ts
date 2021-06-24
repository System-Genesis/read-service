import EntityRepository from './entity.repository';
import RoleRepository from '../role/role.repository';
import DigitalIdentityRepository from '../digitalIdentity/digitalIdentity.repository';
import EntityDenormalizedRepository from './denormal/entity.denormalized.repository';

class EntityManager {
    static entityRepository: EntityRepository = new EntityRepository();

    static roleRepository: RoleRepository = new RoleRepository();

    static digitalIdentityRepository: DigitalIdentityRepository = new DigitalIdentityRepository();

    static entityDenormalizedRepository: EntityDenormalizedRepository = new EntityDenormalizedRepository();

    static async getAll() {
        const entities = await EntityManager.entityRepository.getAll();
        return entities;
    }

    static async findById(id: string, expanded: boolean = false) {
        const repoToRetrieve = expanded ? EntityManager.entityDenormalizedRepository : EntityManager.entityRepository;
        const entities = await repoToRetrieve.findById(id);
        return entities;
    }

    static async getByRole(roleID: string, expanded: boolean = false) {
        const foundRole = await EntityManager.roleRepository.getByRoleId(roleID);
        if (!foundRole) {
            throw Error();
        }
        const { digitalIndentityUniqueId } = foundRole;
        const foundDI = await EntityManager.digitalIdentityRepository.findByUniqueId(digitalIndentityUniqueId);
        if (!foundDI) {
            throw Error();
        }
        const { entityId } = foundDI;
        EntityManager.entityRepository.findById(entityId);
    }

    static async findByDigitalIdentity(uniqueId: string, expanded: boolean = false) {
        const foundDI = await EntityManager.digitalIdentityRepository.findByUniqueId(uniqueId);
        if (!foundDI) {
            throw new Error();
        }
        const entityID = foundDI.entityId;
        const foundEntity = await EntityManager.entityRepository.findById(entityID);
        return foundEntity;
        // const entityId = foundRole.entityId;
        // return entities;
    }
}
export default EntityManager;
