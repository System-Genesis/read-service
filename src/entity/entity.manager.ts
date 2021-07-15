import IEntity from './entity.interface';
import IDenormalizedEntity from './denormal/entity.denormalized.interface';
import EntityRepository from './entity.repository';
import RoleRepository from '../role/role.repository';
import DigitalIdentityRepository from '../digitalIdentity/digitalIdentity.repository';
import EntityDenormalizedRepository from './denormal/entity.denormalized.repository';
import { optionalQueries, tranformIntoQuery, removeDenormalizedFields } from './utils/filterQueries';
import * as ApiErrors from '../core/ApiErrors';

class EntityManager {
    static entityRepository: EntityRepository = new EntityRepository();

    static roleRepository: RoleRepository = new RoleRepository();

    static digitalIdentityRepository: DigitalIdentityRepository = new DigitalIdentityRepository();

    static entityDenormalizedRepository: EntityDenormalizedRepository = new EntityDenormalizedRepository();

    static async getAll(queries: optionalQueries, expanded: boolean = false) {
        const entities = await EntityManager.entityDenormalizedRepository.find(tranformIntoQuery(queries));
        const mappedEntities = entities.map((entity) => {
            return removeDenormalizedFields(entity);
        });
        return mappedEntities;
    }

    static async findById(id: string, expanded: boolean = false) {
        const entity = await EntityManager.entityRepository.findById(id, expanded);
        if (!entity) {
            throw new ApiErrors.NotFoundError();
        }
        return entity;
    }

    static async findByIdentifier(identifier: string, expanded: boolean = false) {
        const entities = await EntityManager.entityRepository.findByIdentifier(identifier, expanded);
        return entities;
    }

    static async findByRole(roleID: string, expanded: boolean = false) {
        const foundRole = await EntityManager.roleRepository.getByRoleId(roleID);
        if (!foundRole) {
            throw new ApiErrors.NotFoundError();
        }
        const { digitalIndentityUniqueId } = foundRole;
        const foundDI = await EntityManager.digitalIdentityRepository.findByUniqueId(digitalIndentityUniqueId);
        if (!foundDI) {
            throw new ApiErrors.NotFoundError();
        }
        const { entityId } = foundDI;
        EntityManager.entityRepository.findById(entityId, expanded);
    }

    static async findByDigitalIdentity(uniqueId: string, expanded: boolean = false) {
        const foundDI = await EntityManager.digitalIdentityRepository.findByUniqueId(uniqueId);
        if (!foundDI) {
            throw new ApiErrors.NotFoundError();
        }
        const entityID = foundDI.entityId;
        const foundEntity = await EntityManager.entityRepository.findById(entityID, expanded);
        return foundEntity;
    }

    static async findUnderGroup(groupID: string, expanded: boolean = false) {
        const foundEntitiesDN = await EntityManager.entityDenormalizedRepository.findUnderGroup(groupID);
        const foundEntitiesIds = foundEntitiesDN.map((entityDN) => entityDN.id);
        let foundEntities: Promise<IEntity[]> | IDenormalizedEntity[] = foundEntitiesDN;
        if (!expanded) {
            foundEntities = EntityManager.entityRepository.findByIds(foundEntitiesIds);
        }
        return foundEntities;
    }

    static async findUnderHierarchy(hierarchy: string, expanded: boolean = false) {
        const foundEntitiesDN = await EntityManager.entityDenormalizedRepository.findUnderHierarchy(hierarchy);
        const foundEntitiesIds = foundEntitiesDN.map((entityDN) => entityDN.id);
        let foundEntities: Promise<IEntity[]> | IDenormalizedEntity[] = foundEntitiesDN;
        if (!expanded) {
            foundEntities = EntityManager.entityRepository.findByIds(foundEntitiesIds);
        }
        return foundEntities;
    }
}
export default EntityManager;
