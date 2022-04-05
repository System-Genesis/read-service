import RoleRepository from './role.repository';
import connection from '../../shared/infra/mongoose/connection';

export const roleRepository = new RoleRepository(connection, 'denormalizedRole');
