/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import { writeFileSync } from 'fs';
import { connectDatabase, closeDatabase, clearDatabase } from './db.service';
import { EntityModel, IEntity } from '../../entity/entity.interface';
import { fakeEntity, generateIDs } from './fakers/entity.faker';
import { fakeHierarchies } from './fakers/group.faker';

(async function seedDB() {
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
        const allGroups = fakeHierarchies();
        await closeDatabase();
    } catch (err) {
        console.log(err.stack);
    }
})();
