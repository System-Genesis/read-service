import GroupRepository from './group.repository';
import connection from '../../shared/infra/mongoose/connection';

export const groupRepository = new GroupRepository(connection, 'group');
