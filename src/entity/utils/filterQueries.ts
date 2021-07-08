export type optionalQueries = {
    ids?: string[];
    rank?: string;
    entityType?: string;
    digitalIdentitySource?: string;
    status?: string;
    updateFrom?: Date;
    page?: string;
};

const queryParser = (queryObj: object): any => {
    const cond = {};
    Object.entries(queryObj).forEach(([field, value]) => {
        if (Array.isArray(value)) {
            cond[field] = { $in: value };
        }
        cond[field] = value;
    });
    return cond;
};

export const tranformIntoQuery = (queries: optionalQueries) => {
    const getAllFilters = queryParser(queries);
    const updatedFromFilter = { updatedAt: { $gte: getAllFilters.updatedFrom } };
    getAllFilters.updatedFrom = getAllFilters.updatedFrom ? updatedFromFilter : undefined;
    return getAllFilters;
};
