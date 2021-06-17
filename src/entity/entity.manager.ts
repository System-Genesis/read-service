import EntityRepository from './entity.repository';

class EntityManager {
    static entityRepository: EntityRepository = new EntityRepository();

    static async getAll() {
        const entities = await EntityManager.entityRepository.getAll();
        return entities;
    }

    static async getById(id: string) {
        const entities = await EntityManager.entityRepository.getById(id);
        return entities;
    }
}
export default EntityManager;
