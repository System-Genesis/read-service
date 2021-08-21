/* eslint-disable import/prefer-default-export */

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
    ['digitalIdentities.source', inArrayQuery],
    ['status', basicQuery],
]);
