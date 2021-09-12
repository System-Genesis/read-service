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
        DigitalIdentityDenormalizedCollectionName: env.get('DI_DENORMALIZED_COLLECTION_NAME').required().asString(),
        RoleCollectionName: env.get('ROLE_COLLECTION_NAME').required().asString(),
        GroupCollectionName: env.get('OG_COLLECTION_NAME').required().asString(),
    },
};

export default config;
