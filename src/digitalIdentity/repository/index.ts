import DigitalIdentityRepository from './digitalIdentity.repository';
import connection from '../../shared/infra/mongoose/connection';

export const digitalIdentityRepository = new DigitalIdentityRepository(connection, 'digitalIdentity');
