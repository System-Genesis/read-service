import * as mongoose from 'mongoose';

const setupDB = (databaseName, runSaveMiddleware = false) => {
    // Connect to Mongoose
    beforeAll(async () => {
        const url = `mongodb://127.0.0.1/${databaseName}`;
        await mongoose.connect(url, { useNewUrlParser: true });
    });
};

export default setupDB;
