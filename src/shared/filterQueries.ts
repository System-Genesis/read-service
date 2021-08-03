export const transformQuery = (queryObj, mapField: Map<string, string>, mapFieldQueryFunc: Map<string, any>): any => {
    const query = {};
    Object.entries(queryObj).forEach(([field, value]) => {
        const deducedField = mapField.get(field) as string;
        query[deducedField] = mapFieldQueryFunc.get(field)(value);
    });
    return query;
};

export const extractUserQueries = (filters, mapField: Map<string, string>, mapFieldQueryFunc: Map<string, any>) => {
    const query = {};
    Object.entries(filters).forEach(([field, value]) => {
        const deducedQuery = mapFieldQueryFunc.get(field)(value);
        const deducedField = mapField.get(field);
        if (deducedField) {
            query[deducedField] = deducedQuery;
        }
    });
    return query;
};
