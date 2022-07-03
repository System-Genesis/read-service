import mongoose from 'mongoose';

import { seedDB, emptyDB } from './seedUtils';

(async () => {
    await mongoose.connect(`mongodb://nitro:password123@localhost:27017/kartoffelMock`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
    });
    try {
        await emptyDB();
        await seedDB();
    } catch (err) {
        console.log(err);
    }
})();
