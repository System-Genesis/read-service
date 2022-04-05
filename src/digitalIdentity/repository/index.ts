import DigitalIdentityRepository from './digitalIdentity.repository';
import connection from '../../shared/infra/mongoose/connection';

// TODO: how implements dependency injections, why necessary
export const digitalIdentityRepository = new DigitalIdentityRepository(connection, 'denormalizedDigitalIdentity');
