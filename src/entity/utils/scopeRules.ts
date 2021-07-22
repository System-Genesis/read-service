// export type entitiesExcluders = {
//     entity: Omit<RuleFilter, 'entityType'>[];
//     digitalIdentity: Omit<RuleFilter, 'entityType'>[];
//     organizationGroup: Omit<RuleFilter, 'entityType'>[];
//     role: Omit<RuleFilter, 'entityType'>[];
// };

export const enum EntityTypes {
    ENTITY = 'entity',
    DI = 'digitalIdentity',
    OG = 'organizationGroup',
    ROLE = 'role',
}

export const enum ScopeFields {
    SOURCE = 'source',
    HIERARCHY = 'hierarchy',
}

export type RuleFilter = {
    field: ScopeFields;
    values: string[];
    entityType: EntityTypes;
};

// export const extractEntitiesExcluders = (filtersQuery: RuleFilter[] = []) => {
//     const excluders: entitiesExcluders = {
//         entity: [],
//         digitalIdentity: [],
//         organizationGroup: [],
//         role: [],
//     };
//     filtersQuery.forEach((filterRule) => {
//         excluders[filterRule.entityType] = {
//             field: filterRule.field,
//             values: filterRule.values,
//         };
//     });

//     return excluders;
// };
