/* eslint-disable no-restricted-syntax */
import * as mongoose from 'mongoose';

import { MongoMemoryServer } from 'mongodb-memory-server';

const mongod = new MongoMemoryServer({
    instance: { port: 28000, dbName: 'Genesis' },
});

/**
 * Connect to the in-memory database.
 */
export const connectDatabase = async () => {
    const uri = await mongod.getUri();

    const mongooseOpts = {
        useNewUrlParser: true,
        autoReconnect: true,
        reconnectTries: Number.MAX_VALUE,
        reconnectInterval: 1000,
    };

    await mongoose.connect(uri, mongooseOpts);
};

/**
 * Drop database, close the connection and stop mongod.
 */
export const closeDatabase = async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await mongod.stop();
};

/**
 * Remove all the data for all db collections.
 */
export const clearDatabase = async () => {
    const { collections } = mongoose.connection;

    // eslint-disable-next-line guard-for-in
    for (const key in collections) {
        const collection = collections[key];
        // eslint-disable-next-line no-await-in-loop
        await collection.deleteMany({});
    }
};
