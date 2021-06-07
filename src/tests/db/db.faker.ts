// eslint-disable-next-line import/no-extraneous-dependencies
import * as faker from 'faker';
import { mongo } from 'mongoose';
import { IEntity } from '../../entity/entity.interface';
import weightedEnums from './weighted.enums';
import { randomFromWeightedEnum, generateTZ } from './utils';

import enums from '../../config/enums';

const fakeEntity = (mi, tz) => {
    let entityObj = {};
    entityObj.entityType = randomFromWeightedEnum(weightedEnums.ENTITY_TYPE);
    entityObj = {
        id: new mongo.ObjectId().toString(),
        displayName: faker.name.firstName(),
        entityType: randomFromWeightedEnum(weightedEnums.ENTITY_TYPE),
        identityCard: mi,
        personalNumber: tz,
        serviceType: randomFromWeightedEnum(weightedEnums.SERVICE_TYPE),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        akaUnit: randomFromWeightedEnum(weightedEnums.CURRENT_UNIT),
        status: randomFromWeightedEnum(weightedEnums.STATUS),
        dischargeDate: faker.date.future(),
        rank: randomFromWeightedEnum(weightedEnums.RANK), // enum
        mail: faker.internet.email(),
        // mobilePHone: faker.PhoneNumber.phoneNumber(),
        clearance: faker.datatype.number({ min: 0, max: 10 }).toString(), // string of number - enum
        sex: randomFromWeightedEnum(weightedEnums.SEX),
        birthDate: faker.date.past(),
    };
    return entityObj as IEntity;
};

const generateIDs = (num: number) => {
    const mis: string[] = [];
    const tzs: string[] = [];
    for (let i = 0; i < num; i += 1) {
        mis.push(faker.datatype.number({ min: 100000, max: 999999999 }).toString());
        tzs.push(generateTZ());
    }

    return { mis, tzs };
};

export { fakeEntity, generateIDs };
