import * as env from 'env-var';
import './dotenv';

const config = {
    service: {
        port: env.get('PORT').required().asPortNumber(),
    },
    mongo: {
        uri: env.get('MONGO_URI').required().asString(),
        EntityCollectionName: env.get('ENTITY_COLLECTION_NAME').required().asString(),
        EntityDenormalizedCollectionName: env.get('ENTITY_DENORMALIZED_COLLECTION_NAME').required().asString(),
        DigitalIdentityCollectionName: env.get('DI_COLLECTION_NAME').required().asString(),
        RoleCollectionName: env.get('ROLE_COLLECTION_NAME').required().asString(),
        GroupCollectionName: env.get('OG_COLLECTION_NAME').required().asString(),
    },
    app: {
        maxPageSize: parseInt(env.get('MAX_PAGE_SIZE').required().asString(), 10),
        minPageSize: parseInt(env.get('MIN_PAGE_SIZE').required().asString(), 10),
    },
};

export default config;
