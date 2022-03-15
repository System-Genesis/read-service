/* eslint-disable no-console */
import pRetry from 'p-retry';
import { connect as connectDB } from './shared/infra/mongoose/connection';
import { initializeS3 } from './utils/pictures/s3Handler';
import Server from './express/server';
import config from './config';

const { mongo, service } = config;

const initializeMongo = async () => {
    try {
        await pRetry(() => connectDB(mongo.uri), {
            onFailedAttempt: (err) => console.log(`[DB]: connection attempt ${err.attemptNumber} failed`),
        });
        console.log('[DB]: connected successfully');
    } catch (err) {
        console.error(err);
    }
};

const main = async () => {
    await initializeMongo();

    initializeS3();

    const server = new Server(service.port);

    await server.start();

    console.log(`Server started on port: ${service.port}`);
};

main().catch((err) => console.error(err));
