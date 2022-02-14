/* eslint-disable import/prefer-default-export */

// TODO (M): change name to client queries, change names of mapField => client to repo, strict types in maps
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
    const query = { ...filters };
    Object.entries(filters).forEach(([field, value]) => {
        if (mapAliasesQueryFunc.get(field)) {
            // TODO (M): single line condition to overwrite not found alias
            // TODO (M): consider starting with empty query
            // TODO (M): cannot tolerate array values - not working ['external', sf_name']
            // TODO (critical M): what you want to get from here
            const deducedValues = mapAliasesQueryFunc.get(field)(value);
            if (deducedValues) {
                // TODO (M): add to array
                query[field] = deducedValues;
            }
        }
    });
    return query;
};

// getting user queries: e.g { source: ['external', city_name'], akaUnit: unit1 } =>
//                           { source: ['es_name', 'sf_name', etc..., 'city_name'], akaUnit: unit1 }
