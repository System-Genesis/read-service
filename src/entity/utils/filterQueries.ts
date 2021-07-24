import IDenormalizedEntity from '../denormal/entity.denormalized.interface';
import { RuleFilter, optionalQueries } from './types';

export const extractFilters = (queryFilters: optionalQueries) => {
    const extractedFilters = queryFilters;
    delete extractedFilters.expanded;
    delete extractedFilters.page;
    delete extractedFilters.ruleFilters;
    return extractedFilters;
};

// export const tranformIntoQuery = (queries: optionalQueries) => {
//     const getAllFilters = queryParser(queries);
//     if (getAllFilters.updatedFrom) {
//         getAllFilters.updatedFrom = { updatedAt: { $gte: getAllFilters.updatedFrom } };
//     }
//     return getAllFilters;
// };

export const removeDenormalizedFields = (entityDN: IDenormalizedEntity) => {
    const entity = entityDN;
    ['digitalIdentities'].forEach((prop) => delete entity[prop]);
    return entity;
};

const idsQuery = (idVals: string[]) => {
    return { $in: idVals };
};

const updatedFromQuery = (updatedFrom: Date) => {
    return { $gte: updatedFrom };
};

const basicQuery = (value) => {
    return { $in: value };
};

export const mapFieldQueryFunc = new Map<string, any>([
    ['ids', idsQuery],
    ['updatedFrom', updatedFromQuery],
    ['entityType', basicQuery],
    ['rank', basicQuery],
    ['digitalIdentities.source', basicQuery],
    ['status', basicQuery],
]);

export const transformQuery = (queryObj: optionalQueries, mapField: Map<string, string>): any => {
    const query = {};
    Object.entries(queryObj).forEach(([field, value]) => {
        const deducedField = mapField.get(field) as string;
        query[deducedField] = mapFieldQueryFunc.get(field)(value);
    });
    return query;
};

export const extractUserFilters = (filters: RuleFilter[], mapField) => {
    const query = {};
    filters.forEach((filter) => {
        const { field, entityType, values } = filter;
        const deducedQuery = mapFieldQueryFunc.get(field)(values);
        const deducedField = mapField.get(field);
        query[deducedField] = deducedQuery;
    });
    return query;
};
