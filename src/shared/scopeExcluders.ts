/* eslint-disable prettier/prettier */
import { RuleFilter, ScopeFields } from './types';

// TODO: why array of string and first element?
const hierarchiesExcluder = (hierarchy: string) => {
    return { $not: { $regex: `^${hierarchy}` } };
};

const otherFieldsExcluder = (fieldValues: string[]) => {
    return { $nin: fieldValues };
};

export const mapFieldQuery = new Map<ScopeFields, any>([
    [ScopeFields.HIERARCHY, hierarchiesExcluder],
    [ScopeFields.SOURCE, otherFieldsExcluder],
]);

// TODO (M): mapField is not clear => different for each entity
export const extractScopesQuery = (excluders: RuleFilter[], mapField) => {
    const query = {};
    excluders.forEach((excluder) => {
        const { field, entityType, values } = excluder;

        const deducedQuery = mapFieldQuery.get(field)(values);
        const deducedField = `${mapField.get(entityType)}${field}`;
        query[deducedField] = deducedQuery;
    });
    return query;
};
