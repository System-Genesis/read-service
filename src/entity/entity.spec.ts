import * as mongoose from 'mongoose';

import { EntityModel } from './entity.interface';

beforeAll(async () => {
    const url = `mongodb://127.0.0.1/${databaseName}`;
    await mongoose.connect(url, { useNewUrlParser: true });
});

it('Should save user to database', async (done) => {
    const name = 'ff';
    const email = 'ff@';
    const entity = new EntityModel({ name, email });
    const ret = await entity.save();
    done();
});
