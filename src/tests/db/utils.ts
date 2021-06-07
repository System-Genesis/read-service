/* eslint-disable no-param-reassign */
// eslint-disable-next-line import/no-extraneous-dependencies
import * as faker from 'faker';

const randomFromWeightedEnum = (weightesDict: { string: number }) => {
    const items = Object.keys(weightesDict);
    const weights = Object.values(weightesDict);
    let i: number;

    for (i = 0; i < weights.length; i += 1) weights[i] += weights[i - 1] || 0;

    const random = Math.random() * weights[weights.length - 1];

    for (i = 0; i < weights.length; i += 1) if (weights[i] > random) break;

    return items[i];
};

const createCheckDigit = (param: string) => {
    const rawCheckDigit = param
        .toString()
        .split('')
        .reduce((accumulator: number, currChar: any, currIndex: number) => {
            const digitWeight = Number(currChar) * ((currIndex % 2) + 1);

            // eslint-disable-next-line no-return-assign
            return (accumulator += digitWeight > 9 ? digitWeight - 9 : digitWeight);
        }, 0);

    return rawCheckDigit % 10 ? 10 - (rawCheckDigit % 10) : 0;
};

const generateTZ = () => {
    const tz: string = faker.datatype.number({ min: 10000000, max: 99999999 }).toString();
    return tz + createCheckDigit(tz);
};

export { randomFromWeightedEnum, generateTZ };
