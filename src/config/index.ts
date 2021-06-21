import * as env from 'env-var';
import './dotenv';

const config = {
    service: {
        port: env.get('PORT').required().asPortNumber(),
    },
    mongo: {
        uri: env.get('MONGO_URI').required().asUrlString(),
        EntityCollectionName: env.get('ENTITY_COLLECTION_NAME').required().asString(),
        EntityDenormalizedCollectionName: env.get('ENTITY_DENORMALIZED_COLLECTION_NAME').required().asString(),
        DigitalIdentityCollectionName: env.get('DI_COLLECTION_NAME').required().asString(),
        DigitalIdentityDenormalizedCollectionName: env.get('DI_DENORMALIZED_COLLECTION_NAME').required().asString(),
        RoleCollectionName: env.get('ROLE_COLLECTION_NAME').required().asString(),
    },
    rabbit: {
        uri: env.get('RABBIT_URI').required().asUrlString(),
        retryOptions: {
            minTimeout: env.get('RABBIT_RETRY_MIN_TIMEOUT').default(1000).asIntPositive(),
            retries: env.get('RABBIT_RETRY_RETRIES').default(10).asIntPositive(),
            factor: env.get('RABBIT_RETRY_FACTOR').default(1.8).asFloatPositive(),
        },
    },
};

export default config;
