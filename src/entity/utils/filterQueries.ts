import IDenormalizedEntity from '../denormal/entity.denormalized.interface';

export type optionalQueries = {
    expanded?: string;
    ids?: string[];
    rank?: string;
    entityType?: string;
    digitalIdentitySource?: string;
    status?: string;
    updateFrom?: Date;
    page?: string;
    ruleFilters: string | string[];
};

export const extractFilters = (queryFilters: optionalQueries) => {
    const extractedFilters = queryFilters;
    delete extractedFilters.expanded;
    delete extractedFilters.page;
    return extractedFilters;
};

const queryParser = (queryObj: object): any => {
    const cond = {};
    Object.entries(queryObj).forEach(([field, value]) => {
        if (Array.isArray(value)) {
            cond[field] = { $in: value };
        } else {
            cond[field] = value;
        }
    });
    return cond;
};

export const tranformIntoQuery = (queries: optionalQueries) => {
    const getAllFilters = queryParser(queries);
    if (getAllFilters.updatedFrom) {
        getAllFilters.updatedFrom = { updatedAt: { $gte: getAllFilters.updatedFrom } };
    }
    return getAllFilters;
};

export const removeDenormalizedFields = (entityDN: IDenormalizedEntity) => {
    const entity = entityDN;
    ['digitalIdentities'].forEach((prop) => delete entity[prop]);
    return entity;
};
