/* eslint-disable prettier/prettier */
import { RuleFilter, ScopeFields } from './types';

const hierarchiesExcluder = (hierarchyValues: string[]) => {
    return { $not: { $regexp: hierarchyValues[0] } };
};

const otherFieldsExcluder = (fieldValues: string[]) => {
    return { $nin: fieldValues };
};

export const mapFieldQuery = new Map<ScopeFields, any>([
    [ScopeFields.HIERARCHY, hierarchiesExcluder],
    [ScopeFields.SOURCE, otherFieldsExcluder],
]);
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
