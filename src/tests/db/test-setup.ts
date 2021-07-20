import * as mongoose from 'mongoose';

const setupDB = (databaseName, runSaveMiddleware = false) => {
    // Connect to Mongoose
    beforeAll(async () => {
        const url = `mongodb://127.0.0.1:28000/${databaseName}`;
        await mongoose.connect(url, { useNewUrlParser: true });
    });

    afterAll(async () => {
        await mongoose.disconnect();
    });
};

export default setupDB;
