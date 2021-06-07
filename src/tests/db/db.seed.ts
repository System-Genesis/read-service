/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import { connectDatabase, closeDatabase, clearDatabase } from './db.service';
import { EntityModel, IEntity } from '../../entity/entity.interface';
import { fakeEntity, generateIDs } from './db.faker';

function randomIntFromInterval(min: number, max: number) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
}
async function seedDB() {
    // Connection URL
    await connectDatabase();
    try {
        await clearDatabase();
        const { mis, tzs } = generateIDs(1000);
        for (const [ind, mi] of mis.entries()) {
            const fakeFields = fakeEntity(mi, tzs[ind]);
            const fakeEntityModel = new EntityModel({ ...fakeFields });
            await fakeEntityModel.save();
        }
    } catch (err) {
        console.log(err.stack);
    }
}
seedDB();
