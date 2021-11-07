import * as env from 'env-var';
import './dotenv';

const config = {
    service: {
        port: env.get('PORT').required().asPortNumber(),
    },
    mongo: {
        uri: env.get('MONGO_URI').required().asString(),
        EntityCollectionName: env.get('ENTITY_COLLECTION_NAME').required().asString(),
        DigitalIdentityCollectionName: env.get('DI_COLLECTION_NAME').required().asString(),
        RoleCollectionName: env.get('ROLE_COLLECTION_NAME').required().asString(),
        GroupCollectionName: env.get('OG_COLLECTION_NAME').required().asString(),
    },
    app: {
        maxPageSize: parseInt(env.get('MAX_PAGE_SIZE').required().asString(), 10),
        minPageSize: parseInt(env.get('MIN_PAGE_SIZE').required().asString(), 10),
    },
    s3: {
        url: env.get('S3_URL').required().asString(),
        region: env.get('REGION').required().asString(),
        accessKeyId: env.get('ACCESS_KEY').required().asString(),
        secretAccessKey: env.get('SECRET_ACCESS_KEY').required().asString(),
        profilesBucketName: env.get('PROFILES_BUCKET_NAME').required().asString(),
    },
};

export default config;
