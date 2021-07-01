const mongoose = require('mongoose');

const databaseName = 'genesis';

beforeAll(async () => {
    const url = `mongodb://127.0.0.1/${databaseName}`;
    await mongoose.connect(url, { useNewUrlParser: true });
});
