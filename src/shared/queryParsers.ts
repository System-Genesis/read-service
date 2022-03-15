/* eslint-disable import/prefer-default-export */
import config from '../config/index';

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
    ['personalNumbers', inArrayQuery],
    // TODO: function identityCard with trimZeros
    ['identityCards', inArrayQuery],
    ['updatedFrom', updatedFromQuery],
    ['entityType', inArrayQuery],
    ['rank', inArrayQuery],
    ['akaUnit', inArrayQuery],
    ['source', inArrayQuery],
    ['digitalIdentity.source', inArrayQuery],
    ['digitalIdentities.uniqueIds', inArrayQuery],
    ['status', basicQuery],
]);

const extractSourceValues = (values: string | string[]) => {
    if (Array.isArray(values)) {
        // parse alias if comes in array
        // TODO: refactor into function
        const concatenatedSources = values.reduce((prev: string[], elem: string) => {
            const extractedValues = config.app.aliases[elem] || [elem];
            return [...prev, ...extractedValues];
        }, []);
        return concatenatedSources;
    }
    return config.app.aliases[values] || [values];
};

export const mapQueryValueAlias = new Map<string, any>([
    ['digitalIdentity.source', extractSourceValues],
    ['source', extractSourceValues],
]);
