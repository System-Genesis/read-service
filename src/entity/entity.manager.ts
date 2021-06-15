import EntityModel from './entity.model';
import IEntity from './entity.interface';

export class EntityManager {
    static getEntities(query: Partial<IEntity>) {
        return EntityModel.find(query).exec();
    }
}

export default EntityManager;
