/* eslint-disable import/prefer-default-export */
import { aliases } from '../config/domain-enums';

const updatedFromQuery = (updatedFrom: Date) => {
    return { $gte: new Date(updatedFrom) };
};

const basicQuery = (value) => {
    return value;
};

const inArrayQuery = (values: string[]) => {
    return { $in: values };
};

export const mapFieldQueryFunc = new Map<string, any>([
    ['ids', inArrayQuery],
    ['updatedFrom', updatedFromQuery],
    ['entityType', basicQuery],
    ['rank', basicQuery],
    ['source', inArrayQuery],
    ['digitalIdentities.source', inArrayQuery],
    ['status', basicQuery],
]);

const extractSourceValues = (value: string) => {
    const extractedValues = aliases[value] || [value];
    return extractedValues;
};

export const mapQueryValueAlias = new Map<string, any>([
    ['digitalIdentities.source', extractSourceValues],
    ['source', extractSourceValues],
]);
