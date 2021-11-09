/* eslint-disable import/prefer-default-export */
import { aliases } from '../config/domain-enums';

const updatedFromQuery = (updatedFrom: Date) => {
    return { $gte: new Date(updatedFrom) };
};

const basicQuery = (value) => {
    return value;
};

const inArrayQuery = (values: string | string[]) => {
    if (typeof values === 'string') {
        return values;
    }
    if (Array.isArray(values)) {
        return { $in: values };
    }
    return {};
};

export const mapFieldQueryFunc = new Map<string, any>([
    ['ids', inArrayQuery],
    ['updatedFrom', updatedFromQuery],
    ['entityType', inArrayQuery],
    ['rank', inArrayQuery],
    ['source', inArrayQuery],
    ['digitalIdentity.source', inArrayQuery],
    ['status', basicQuery],
]);

const extractSourceValues = (value: string) => {
    const extractedValues = aliases[value] || [value];
    return extractedValues;
};

export const mapQueryValueAlias = new Map<string, any>([
    ['digitalIdentity.source', extractSourceValues],
    ['source', extractSourceValues],
]);
