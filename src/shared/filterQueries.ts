/* eslint-disable import/prefer-default-export */

export const extractUserQueries = <T>(filters: T, mapField: Map<string, string>, mapFieldQueryFunc: Map<string, any>) => {
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

export const extractAliasesUserQueries = <T>(filters: T, mapAliasesQueryFunc: Map<string, any>) => {
    const query = {};
    Object.entries(filters).forEach(([field, value]) => {
        if (mapAliasesQueryFunc.get(field)) {
            const deducedValues = mapAliasesQueryFunc.get(field)(value);
            if (deducedValues) {
                query[field] = deducedValues;
            }
        }
    });
    return query;
};
