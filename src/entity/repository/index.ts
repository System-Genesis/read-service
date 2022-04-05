import EntityRepository from './entity.repository';
import connection from '../../shared/infra/mongoose/connection';

export const entityRepository = new EntityRepository(connection, 'denormalizedEntity');
